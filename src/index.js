const path = require('path');

const processData  = require('./modules/processData');

// API Gateway handler
exports.handler = async (event, context) => {
  if (event.body != null) await processData(event.body);
};

/*

PAYLOAD Bracelets
{
  "braceletId" : "guid",
  "heartbeat" : "int",
  "actualPosition" : "varchar (coordinates  example : 45.962650,  12.655040)",
  "bloodPressure" : {
    "systolicPressure" : "int",
    "diastolicPressure" : "int"
  },
  "oxygenSaturation" : "int (0 - 100%)",
  "steps" : "int (0 - n)",
  "battery" : "int (0 - 100 %)",
  "timestamp" : "timestamp",
  "alarm" : "FALL || LOW_BATTERY"
}

*/
