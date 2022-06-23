// Module to register an alarm into relational DB
const { constants } = require("../config");

// HTTP Req /alarms
module.exports.registerAlarm = async (alarmBody) => {
  const res = await fetch(constants.API_GATEWAY + "/alarms", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(alarmBody),
  });
  const values = await res.json();
  
};
