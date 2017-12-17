import path from 'path';
import generateThumbnails from '../services/ffmpeg.service';
import { upload_multiple_file } from '../utils/aws-s3';

console.log(path.join(__dirname, '../../../thumbnails'));

function upload(req, res, next) {
  if(!req.files) {
    console.log('No files received');
    return res.send({ success: false, message: 'No files received' });
  } else {
    console.log('file received');
    generateThumbnails();
    upload_multiple_file(path.join(__dirname, '../../../thumbnails'));
    return res.send({ success: true, message: 'File received' });
  }
}

module.exports = {
  upload,
};
