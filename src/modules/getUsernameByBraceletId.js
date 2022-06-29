const { constants } = require("../config");

// Get username by BraceletId
const getUsernameByBraceletId = async (braceletId) => {
  const res = await fetch(
    constants.API_GATEWAY + `/user-secure-contacts/?braceletId=${braceletId}`
  );
  let body = res.json();
  return body.username;
};

module.exports = getUsernameByBraceletId;
