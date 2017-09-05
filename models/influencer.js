var mongoose = require('mongoose');
var Influencer = mongoose.Schema;

var influencerSchema = new Influencer({});
const Influencers = module.exports = mongoose.model('influencers', influencerSchema);