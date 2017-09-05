var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//var summarySchema = new Schema({});
var summarySchema = new Schema({
    // "_id" : ObjectId,
    //schemename : 
    "Scheme Name" : String,
    //"KPI" : String,
    //"Sub KPI" : String,
    "Current Speed" : String,
    "Required Speed" : String,
    "Start Date" : String,
    "End Date" : String,
    "Works Completed" : String,
    "Works Remaining" : String,
    "Works Completed in %" :String,
    "Time Passed" : String,
    "Time Remaining" : String,
    "Time Passed in %" : String,
    "Amount Spent" : String,
    "Amount Remaining" : String,
    "Amount Spent in %" : String,
    "Popularity Positive" : String,
    "Popularity Negative" :String,
    "Popularity Neutral" : String,
    "Feedback Open" : String,
    "Feedback Acknowledged" : String,
    "Average Response Time" : String,
    "Pulse Broadcased" :String,
    "Pulse Responses" : String

});
const Summary = module.exports = mongoose.model('summary', summarySchema);
