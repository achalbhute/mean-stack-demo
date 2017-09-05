var mongoose = require('mongoose');
var Sentiment = mongoose.Schema;

var sentimentSchema = new Sentiment({});
const Sentiments = module.exports = mongoose.model('sentiments', sentimentSchema);