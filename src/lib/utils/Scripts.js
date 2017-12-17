import joi from 'joi';

class Script {
  static getStringBetweenChars(str, charA, charB) {
    return str.substring(str.lastIndexOf(charA) + 1, str.lastIndexOf(charB));
  }

  static removeCharacterAt(str, index) {
    return str.slice(0, index) + str.slice(index + 1);
  }

  static validatePayload(payload, schema) {
    const { error, value } = joi.validate(payload, schema);
    if (error) return { success: false, message: this.getStringBetweenChars(error.message, '[', ']') };
    return { success: true, message: 'Payload validation successful', data: value };
  }
}

module.exports = Script;
