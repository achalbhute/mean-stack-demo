var mongoose = require('mongoose');
var Maphf = mongoose.Schema;

var maphfSchema = new Maphf({});
const Maphfs = module.exports = mongoose.model('mapheaderfooters', maphfSchema);