var mongoose = require('mongoose');
var Status = mongoose.Schema;

var statusSchema = new Status({});
const Statuses = module.exports = mongoose.model('status', statusSchema);