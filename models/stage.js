var mongoose = require('mongoose');
var Stage = mongoose.Schema;

var stagesSchema = new Stage({});
const Stages = module.exports = mongoose.model('stages', stagesSchema);
