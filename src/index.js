const path = require("path");

import { TimestreamWriteClient, WriteRecordsCommand } from "@aws-sdk/client-timestream-write";

// load environment variables
import { constants } from "./config";

const client = new TimestreamWriteClient({ region: constants.REGION });


// API Gateway handler
exports.handler = async (event, context) => {
	if (Object.keys(event) != null) {
		const res = await sendMessage(event);
		return res;
	}
};

/*

PAYLOAD Bracelets
{
  "braceletId" : "guid",
  "heartbeat" : "int",
  "actualPosition" : "varchar (coordinates  example : 41°24'12.2"N 2°10'26.5"E)",
  "bloodPressure" : {
    "systolicPressure" : "int",
    "diastolicPressure" : "int"
  },
  "oxygenSaturation" : "int (0 - 100%)",
  "steps" : "int (0 - n)",
  "battery" : "int (0 - 100 %)",
  "timestamp" : "timestamp",
  "alarms" : "FALL || LOW_BATTERY"
}

*/
