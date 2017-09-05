var mongoose = require('mongoose');
var Spotlight = mongoose.Schema;

var spotlightSchema = new Spotlight({});
const Spotlights = module.exports = mongoose.model('spotlights', spotlightSchema);