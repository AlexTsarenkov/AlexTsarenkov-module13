function linkValidator(value) {
  return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/gi.test(value);
}

module.exports.linkValidator = linkValidator;
