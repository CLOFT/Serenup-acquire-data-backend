import fetch from "node-fetch";

// Insert bracelets data into TimeStream DB
const insertData = async (data) => {
	const dimensions = [{ Name: "region", Value: constants.REGION }];

	const braceletsData = data;

	const records = [braceletsData];

	// WriteRecordsCommandInput
	const input = {
		DatabaseName: constants.DATABASE_NAME,
		TableName: constants.TABLE_NAME,
		Records: records,
	};

	const command = new WriteRecordsCommand(input);
	const response = await client.send(command);
	console.log(response);
};

// Insert alarms into RDS doing a POST req on /alarms
const insertAlarms = async (body) => {
	const response = await fetch(constants.ALARMS_ENDPOINT, {
		method: "post",
		body: JSON.stringify(body),
		headers: { "Content-Type": "application/json" },
	});
	const data = await response.json();
  // TODO check results
};

// Process bracelets data
export const processData = async (data) => {
	let isAlarm = data.Fall || data.LowBattery;

	if (isAlarm) {
		// TODO : send alarm message to SNS
		await insertAlarms(data, isAlarm);
	}

	await insertData(data);
};
