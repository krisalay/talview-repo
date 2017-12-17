import jwtToken from '../services/token/jwt';
import apiKey from '../services/token/api-key';

class Token {
  static JWT() {
    return jwtToken;
  }

  static API() {
    return apiKey;
  }
}

module.exports = Token;
