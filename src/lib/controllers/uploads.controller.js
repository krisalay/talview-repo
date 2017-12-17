import generateThumbnails from '../services/ffmpeg.service';

function upload(req, res, next) {
  if(!req.files) {
    console.log('No files received');
    return res.send({ success: false, message: 'No files received' });
  } else {
    console.log('file received');
    generateThumbnails();
    return res.send({ success: true, message: 'File received' });
  }
}

module.exports = {
  upload,
};
