const path = require('path');

const processData  = require('./modules/processData');

// API Gateway handler
exports.handler = async (event, context) => {
  if (event.body != null) await processData(event.body);
};
