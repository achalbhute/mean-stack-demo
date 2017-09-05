var mongoose = require('mongoose');
var Action = mongoose.Schema;

var actionSchema = new Action({});
const Actions = module.exports = mongoose.model('actions', actionSchema);