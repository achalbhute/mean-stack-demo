var mongoose = require('mongoose');
var Insight = mongoose.Schema;

var insightSchema = new Insight({});
const Insights = module.exports = mongoose.model('insights', insightSchema);