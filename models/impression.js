var mongoose = require('mongoose');
var Impression = mongoose.Schema;

var impressionSchema = new Impression({});
const Impressions = module.exports = mongoose.model('impressions', impressionSchema);