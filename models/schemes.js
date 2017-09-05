var mongoose = require('mongoose');
var Scheme = mongoose.Schema;
var Sentiments = require('../models/sentiment');


//  var fbckPlsesSchema = new Scheme({
//     "schemeId" : String,
//     "open" :String,
//     "acknowledged" : String,
//     "avgresponsetime" :String,
//     "pulsebroadcasts" : String,
//     "pulseresponses" : String
// });

var schemeSchema = new Scheme({});
//     "programId" : String,
//     "programName" :String,
//     "schemeId" : String,
//     "schemeName" :String,
//     "KPI" : String,
//     "startdate" : Date,
//     "enddate" : Date,
//     "Suggested" : Number,
//     "totalBudget" : Number,
//     "feedback": {type: mongoose.Schema.Types.ObjectId, ref: 'feedbackpulses'},
//     "sentiments" :  {type: mongoose.Schema.Types.ObjectId, ref: 'feedbackpulses'}
// });
//     var FbckPlse = mongoose.Schema;


 //    const FbckPlses = module.exports = mongoose.model('feedbackpulses', fbckPlsesSchema);

const Schemes = module.exports = mongoose.model('schemes', schemeSchema);