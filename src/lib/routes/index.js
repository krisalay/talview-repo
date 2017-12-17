import express from 'express';
import upload from '../services/upload.service';
import controller from '../controllers/uploads.controller';

const router = express.Router({ mergeParams: true });

router.get('/status', (req, res) => {
  res.send('OK');
});

router.post('/api/upload', upload.any(), controller.upload);

module.exports = router;
