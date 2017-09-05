var mongoose = require('mongoose');
var FbckPlse = mongoose.Schema;

var fbckPlsesSchema = new FbckPlse({});
const FbckPlses = module.exports = mongoose.model('feedbackpulses', fbckPlsesSchema);