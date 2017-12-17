import ffmpeg from 'fluent-ffmpeg';
import path from 'path';

function generateThumbnails() {
  const proc = ffmpeg(path.join(__dirname, '../../../uploads/test.mp4'))
  // setup event handlers
  .on('filenames', function(filenames) {
    console.log('screenshots are ' + filenames.join(', '));
  })
  .on('end', function() {
    console.log('screenshots were saved');
  })
  .on('error', function(err) {
    console.log('an error happened: ' + err.message);
  })
  // take 2 screenshots at predefined timemarks and size
  .screenshots({
    count: 4,
    timestamps: ['0%', '25%', '50%', '75%'],
    folder: path.join(__dirname, '../../../thumbnails'),
    size: '320x240'
  });
}

module.exports = generateThumbnails;