const path = require('path');
const fs = require("fs");
//const _file_dirname = '../../client/src/files/';
const _file_dirname = '../client/files/';

class FileController {

  // POST read file
  readFileBase64 = (req, res, next) => {
    const { body: { filename,blob } } = req;
    if(filename.dir_name !='' && filename.file_name !='') {
      let path_urs = path.join(__dirname, _file_dirname);
      if (fs.existsSync(path_urs+filename.dir_name+'/'+filename.file_name)) {
        fs.readFile(path_urs+filename.dir_name+'/'+filename.file_name, 'base64', (error, data) => {
          if (error) {
            console.log('read file error :',error);
            return res.status(400).json({reason:'read file error'});
          } else {
            console.log("read file :", path_urs+filename.dir_name+'/'+filename.file_name);
            return res.json({
              filename,
              blob: {
                file_blob: data
              }
            });
          }
        });
      } else {
        console.log('read file error : file or dir not exist');
        return res.status(400).json({reason:'read file error file or dir not exist'});
      }
    } else {
      console.log('read file error : - no input file or dir');
      return res.status(400).json({reason:'read file error - no input file or dir'});
    }
  }

  // POST read directory list files
  readDirByName = (req, res, next) => {
    const { body: { filename } } = req;
    let path_urs = path.join(__dirname, _file_dirname)+filename.dir_name;
    if (path_urs[path_urs.length-1] !== '/') path_urs+='/';
    console.log ('read dir:',path_urs)
    if (fs.existsSync(path_urs)){
      fs.readdir(path_urs, (error, files) => {
        if (error) {
          console.log('read dir error :',error);
          return res.status(400).json({reason:'read dir error'});
        } else {
          console.log("read dir :", filename.dir_name);
          return res.json({
            dir_name: filename.dir_name,
            files_list: files
          });
        }
      });
    } else {
      return res.json({
        dir_name: filename.dir_name,
        files_list: null,
      });
    }
  }

  //POST write file
  writeFileBase64 = (req, res, next) => {
    let file_data;
    const { body: { filename,blob } } = req;
    //console.log(filename.file_name);
    //console.log(req.body);
    if(blob.file_blob !=null && filename.file_name.length>0) {
      let path_urs = path.join(__dirname, _file_dirname);
      if (filename.dir_name.length>0) {
        if (!fs.existsSync(path_urs+filename.dir_name)){
          fs.mkdirSync(path_urs+filename.dir_name);
        }
        path_urs = path.join(__dirname, _file_dirname,filename.dir_name,'/');
      }
      console.log('writeFileBase64:',filename.file_name,' Length:',blob.file_blob.length,' filedata:', blob.file_blob.substr(0,40));
      if (blob.file_blob.indexOf("base64") !== -1) {
        file_data = blob.file_blob.substr(blob.file_blob.indexOf("base64") + 7);
      } else {
        file_data = blob.file_blob;
      }
      fs.writeFile(path_urs + filename.file_name, file_data, {encoding: 'base64'}, function(error) {
        if (error) {
          console.log('file write error:',error);
          return res.status(400).json({reason:'file write error'});
        } else {
          console.log("New File Write", path_urs + filename.file_name);
          return res.json({
            result:"OK",
            file: ''+path_urs+filename.file_name
          });
        }
      });
    } else {
      console.log("New File Write - file_name or blob not exist");
      return res.status(400).json({reason:"New File Write - file_name or blob not exist"});
    }
  }
}

module.exports = {
    fileController: new FileController ()
}
