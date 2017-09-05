var mongoose = require('mongoose');
var Expenditure = mongoose.Schema;

var expSchema = new Expenditure({});
const Expenditures = module.exports = mongoose.model('expenditure', expSchema);
