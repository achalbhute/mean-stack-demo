var mongoose = require('mongoose');
var Gender = mongoose.Schema;

var genderSchema = new Gender({});
const Genders = module.exports = mongoose.model('genders', genderSchema);