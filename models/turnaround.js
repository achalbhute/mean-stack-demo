var mongoose = require('mongoose');
var TurnAround = mongoose.Schema;

var tatSchema = new TurnAround({});
const TurnArounds = module.exports = mongoose.model('turnaroundtime', tatSchema);
