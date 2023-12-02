const mongoose = require('mongoose');

 
// The schema is set to be flexible (strict: false) to accommodate various log entry structures.

const logSchema = new mongoose.Schema({}, { strict: false });

//This model will be used to interact with the 'logs' collection in MongoDB.
module.exports = mongoose.model('Log', logSchema);
