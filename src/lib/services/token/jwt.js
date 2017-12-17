import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const privateKey = fs.readFileSync(path.join(__dirname, '../../../../private.key'), 'utf8');
const publicKey = fs.readFileSync(path.join(__dirname, '../../../../public.key'), 'utf8');

const issuer = 'Codexia Developers Platform';
const subject = 'joe@user.org';
const audience = 'http://www.codexia.com';

function generate(payload, expiresIn) {
  const signOptions = {
    issuer,
    subject,
    audience,
    expiresIn,
    algorithm: 'RS256',
  };
  const token = jwt.sign(payload, privateKey, signOptions);
  return token;
}

function verifyJwtToken(token, maxAge) {
  if (!token) return { success: false, message: 'authorization token not provided', data: null };
  const verifyOptions = {
    issuer,
    subject,
    audience,
    maxAge,
    algorithms: ['RS256'],
  };
  let decoded;
  try {
    decoded = jwt.verify(token, publicKey, verifyOptions);
  } catch (e) {
    return { success: false, message: 'token authentication failed', data: null };
  }
  return { success: true, message: 'token authentication successful', data: decoded };
}

module.exports = {
  generate,
  verifyJwtToken,
};
