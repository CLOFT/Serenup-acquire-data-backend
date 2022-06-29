const { constants } = require('../config');
const getUsernameByBraceletsId = require('./api-gateway/bracelets');
const { getSecureContactsByUsername } = require('./userSecureContacts');

// Send alarm message to SNS
const sendAlarm = async (body) => {
  const username = await getUsernameByBraceletsId(body.braceletId);

  // TODO : get secure contacts by username
  const secureContacts = await getSecureContactsByUsername(username);

  const message = {
    BraceletId: body.BraceletId,
    Type: body.Alarms,
    Value: body.Battery,
    SecureContacts: secureContacts,

    // TODO : review payload for alarms again
    // TODO : check payload format of secureContacts
  };
  /* body : 
        {
            BraceletId : "guid",
            Type : "FALL || LOW_BATTERY",
            Value : "int" (only for Battery at the moment),
            SecureContacts : [  // array with contacts' email
                {
                    email : "email",
                },
                ...
            ]
        }   
    */

  // TODO : send alarm message to SNS
};

// TODO : create a mock test to send alarm from local
const sendAlarmTest = async () => {
    // TODO : implement send SNS msg test
};

module.exports = sendAlarm;
