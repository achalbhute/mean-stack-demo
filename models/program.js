var mongoose = require('mongoose');
var Program = mongoose.Schema;

var programSchema = new Program({});
const Programs = module.exports = mongoose.model('programs', programSchema);