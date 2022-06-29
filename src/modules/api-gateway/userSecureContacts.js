const { constants } = require('../config');

// TODO : implement module to get secure contacts from RDS by username
const getSecureContactsByUsername = async (username) => {
  // GET /user-secure-contacts , parameters : {username}
  const response = await fetch(
    constants.API_GATEWAY + `/user-secure-contacts/?username=${username}`
  );
  const result = await response.json();
  return result.secureContacts;
};

module.exports = getSecureContacts;
