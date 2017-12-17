import crypto from 'crypto';
import uuid from 'uuid';

function encrypt(text) {
  const cipher = crypto.createCipheriv(process.env.ENCRYPTION_ALGO, process.env.ENCRYPTION_PASS, 'bhcbc6f');
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const tag = cipher.getAuthTag();
  return {
    content: encrypted,
    tag,
  };
}

function decrypt(encrypted) {
  const decipher = crypto.createDecipheriv(process.env.ENCRYPTION_ALGO, process.env.ENCRYPTION_PASS, 'bhcbc6f');
  decipher.setAuthTag(encrypted.tag);
  let dec = decipher.update(encrypted.content, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

function generateUUIDApiKey(payload) {
  return uuid.v4(payload, process.env.API_UUID_NAMESPACE);
}

module.exports = {
  encrypt,
  decrypt,
  generateUUIDApiKey,
};
