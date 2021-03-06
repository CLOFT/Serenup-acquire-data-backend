const { constants } = require('../config');
const { TimestreamWriteClient, WriteRecordsCommand } = require('@aws-sdk/client-timestream-write');

// Initialize Timestream Client
const client = new TimestreamWriteClient({
  region: constants.REGION,
  credentials: {
    accessKeyId: constants.ACCESSKEYID,
    secretAccessKey: constants.SECRETACCESSKEY,
  },
});

// Prepare records for Timestream WriteCommand
const prepareRecords = (data, dimensions) => {
  // data.time = data.time.toString(); // convert to unix timestamp
  const { time : time } = { ...data };
  delete data.time;

  const payload = {
    Dimensions: dimensions,
    MeasureName: 'data',
    MeasureValue: JSON.stringify(data),
    MeasureValueType: 'VARCHAR',
    Time: time,
  };

  return [payload];
};

// Insert into Timestream DB with sdk
module.exports.registerData = async (data) => {
  // required
  const dimensions = [{ Name : "bracelet_id", Value : data.serialNumber}];
  const records = prepareRecords(data, dimensions);

  // WriteRecordsCommandInput
  const input = {
    DatabaseName: constants.DATABASE_NAME,
    TableName: constants.TABLE_NAME,
    Records: records,
  };

  const command = new WriteRecordsCommand(input);
  const response = await client.send(command);
  return response;
};

/*

PAYLOAD Bracelets
{
  "serialNumber" : "guid",
  "heartbeat" : "int",
  "actualPosition" : "varchar (coordinates  example : 41°24'12.2"N 2°10'26.5"E)",
  "bloodPressure" : {
    "systolicPressure" : "int",
    "diastolicPressure" : "int"
  },
  "oxygenSaturation" : "int (0 - 100%)",
  "steps" : "int (0 - n)",
  "battery" : "int (0 - 100 %)",
  "time" : "timestamp",
  "alarm" : "FALL || LOW_BATTERY"
}

*/
