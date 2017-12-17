import { JWT } from '../utils/Token';

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  const result = JWT().verifyJwtToken(token, '24h');
  if (!result.success) {
    return res.status(401).json(result);
  }
  req.decoded = result;
  return next();
}

module.exports = verifyToken;
