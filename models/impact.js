var mongoose = require('mongoose');
var Impact = mongoose.Schema;

var impactSchema = new Impact({});
const Impacts = module.exports = mongoose.model('impacts', impactSchema);