const { insertData } = require("./insertData");

// Process bracelets data
module.exports.processData = async (data) => {
  let isAlarm = data.Fall || data.LowBattery;

  if (isAlarm) {
    // TODO : send alarm message to SNS
    // TODO : insert alarm into DB
  }

  data = JSON.parse(data);
  const res = await insertData(data);
  if (res) console.log("Insert went successful!");
};
