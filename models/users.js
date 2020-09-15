const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const UsersSchema = new Schema({
  first_name: String,
  last_name: String,
  category: {
    type: String,
    default: 'sales',
    enum: ['manager', 'instructor', 'sales', 'marketing']
  },
  role: {
    type: String,
    default: 'basic',
    enum: ['branch','basic', 'supervisor', 'admin']
  },
  branch: {
    type: String,
    default: '100',
    enum: ['100','200','300']
  },
  phone: String,
  photo: String,
  address: String,
  email: {
    type: String,
    required: 'Require e-mail',
    unique: 'Such e-mail exist'
  },
  rtuser: {
    type: String,
    required: 'Require smartcv',
    unique: 'Such rtuser exist'
  },
  hash: String,
  salt: String
});

UsersSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UsersSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UsersSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
}

UsersSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT(),
    role: this.role,
    category: this.category,
    first_name: this.first_name,
    last_name: this.last_name, 
    rtuser: this.rtuser, 
    photo: this.photo,
    branch: this.branch
  };
};

mongoose.model('Users', UsersSchema);