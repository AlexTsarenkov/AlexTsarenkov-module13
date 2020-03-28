function linkValidator(value) {
  return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/gi.test(value);
}

module.exports.linkValidator = linkValidator;
