require("dotenv").config({ path: path.join(__dirname, ".env") });

export const constants = {
	DATABASE_NAME: process.env.DATABASE_NAME,
	TABLE_NAME: process.env.TABLE_NAME,
	REGION: process.env.REGION,
	ALARMS_ENDPOINT : process.env.ALARMS_ENDPOINT
};
