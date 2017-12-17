var AWS = require('aws-sdk');
var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();
var Q = require('q');

app.set('accessKeyId', process.env.ACCESS_KEY_ID);
app.set('secretAccessKey', process.env.SECRET_ACCESS_KEY);
app.set('region', process.env.AWS_REGION);
app.set('bucket', process.env.BUCKET);

var s3 = new AWS.S3();

s3.config.credentials = {
	accessKeyId     : app.get('accessKeyId'),
	secretAccessKey     : app.get('secretAccessKey'),
	region : app.get('region'),
};

function getContentTypeByFile(fileName) {
  var rc = 'application/octet-stream';
  var fn = fileName.toLowerCase();

  if (fn.indexOf('.html') >= 0) rc = 'text/html';
  else if (fn.indexOf('.css') >= 0) rc = 'text/css';
  else if (fn.indexOf('.json') >= 0) rc = 'application/json';
  else if (fn.indexOf('.js') >= 0) rc = 'application/x-javascript';
  else if (fn.indexOf('.png') >= 0) rc = 'image/png';
  else if (fn.indexOf('.jpg') >= 0) rc = 'image/jpg';
  else if (fn.indexOf('.mp4') >= 0) rc= 'video/mp4';
  return rc;
}

function getFileList(path){
  var i, fileInfo, filesFound;
  var fileList = [];

  filesFound = fs.readdirSync(path);
  for (i = 0; i < filesFound.length; i++) {
    fileInfo = fs.lstatSync(path + filesFound[i]);
    if (fileInfo.isFile()) fileList.push(filesFound[i]);
  }
  return fileList;
}

module.exports = {
	get_image_url : function(key){
    	var params = {Bucket:app.get('bucket'), Key: key };
    	var url_img;
    	s3.getSignedUrl('getObject', params, function(err,url){
      		if(err)
        		console.log(err);
      		url_img =  url;
    	});
    	return url_img;
  	},

    get_JSON : function(key){
      var deferred = Q.defer();
      s3.getObject({Bucket: app.get('bucket'), Key:key})
        .on('success', function(response){
          deferred.resolve({success:true,data:response.data.Body});
        })
        .on('error',function(response){
          deferred.resolve({success:false, data:null});
        }).send();
        return deferred.promise;
    },
    upload_single_file : function(path_to_file,key){
      var fileBuffer = fs.readFileSync(`${path_to_file}/${key}`);
      var metaData = getContentTypeByFile(key);

      s3.putObject({
        Bucket: app.get('bucket'),
        Key: key,
        Body: fileBuffer,
        ContentType: metaData
      }, function(error, response) {
        if(error) {
          console.log(`Error uploading file ${key} to s3`);
        } else {
          console.log('uploaded file ' + key);
        }
      });
    },

    upload_multiple_file : function(folderPath,bucket_folder_structure){
      var fileList = getFileList(path.join(__dirname, '../../../thumbnails/'));
      fileList.forEach(function(entry){
        console.log(entry);
        module.exports.upload_single_file(folderPath, entry, );
      });
    }
};
