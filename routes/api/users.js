const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
const path = require('path');
const fs = require("fs");
const _img_dirname = '../../../client/src/assets/img/usr/';

//POST user update
router.post('/update', auth.required, (req, res, next) => {
  const { body: { user,photo } } = req;
  // first - picture change
  let file_name = user.photo;
  if(photo.img_blob) {
    let img_substr = '';
    for (let i=0; i<20; i++) {
      img_substr += photo.img_blob[i];
    }
    if ( img_substr.indexOf("jpeg") != -1 ) {
      file_name = user.email + ".jpg";
    }
    if ( img_substr.indexOf("png")  != -1 ) {
      file_name = user.email + ".png";
    }
    let img_data = photo.img_blob.replace(/^data:image\/\w+;base64,/, "");
    let path_urs = path.join(__dirname, _img_dirname);
    fs.writeFile(path_urs + user.photo, img_data, {encoding: 'base64'}, function(error) {
      if (error) {
        console.log('file write error:',error);
        return res.status(400).json({reason:'file write error'});
      }
    });
  }
  // Secong - update other fields
  console.log("file_name 2",file_name);
  Users.findByIdAndUpdate(user._id, {
    first_name: user.first_name,
    last_name:  user.last_name,
    category:   user.category,
    role:       user.role,
    branch:     user.branch,
    phone:      user.phone,
    address:    user.address,
    photo:      file_name,
    rtuser:     user.rtuser }, function(err, u){
    if(err) {
      console.log(err);
      return res.status(400).json({reason:'Error updating recoed'});
    }
    console.log("upgated user", u);
    return res.json(u);
  });

});

//POST new user route
router.post('/', auth.required, (req, res, next) => {
  const { body: { user,photo } } = req;
  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }
  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }
  const eml = user.email;
  Users.find({'email' : eml}, function(err,usr) {
    if(usr.length>0) {
      return res.status(400).json({reason:'Email exist'});
    } else {
      const rtuser = user.rtuser;
      Users.find({'rtuser' : rtuser}, function(err,usr) {
        if(usr.length>0) {
            return res.status(400).json({reason:'Rtuser exist'});
        } else {
          if(photo.img_blob) {
            let img_substr = '';
            for (let i=0; i<20; i++) {
              img_substr += photo.img_blob[i];
            }
            if ( img_substr.indexOf("jpeg") != -1 ) {
              user.photo = user.email + ".jpg";
            }
            if ( img_substr.indexOf("png")  != -1 ) {
              user.photo = user.email + ".png";
            }
          }
          const finalUser = new Users(user);
          finalUser.setPassword(user.password);
          if(!photo.img_blob) {
            return finalUser.save()
            .then(() => res.json({ user: finalUser.toAuthJSON() }));
          } else {
            let img_data = photo.img_blob.replace(/^data:image\/\w+;base64,/, "");
            let path_urs = path.join(__dirname, _img_dirname);
            fs.writeFile(path_urs + user.photo, img_data, {encoding: 'base64'}, function(error) {
              console.log('file write error:',error);
              return finalUser.save()
              .then(() => res.json({ user: finalUser.toAuthJSON() }))
            });
          }
        }
      });
    }
  });
});

//POST login route
router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;
  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required', 
      },
    });
  }
  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }
  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }
    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();
      return res.json({ user: user.toAuthJSON()});
    }
    return res.status(400).json(info);
  })(req, res, next);
});

//GET userlist request
router.get('/userlist', auth.required, (req, res, next) => {
  const { payload: { id } } = req;
  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }
      Users.find()
      .then((userlist) => {
          if(!userlist) {
            return res.sendStatus(400);
          }
          return res.json(userlist);
      });
    });
}); 

module.exports = router;