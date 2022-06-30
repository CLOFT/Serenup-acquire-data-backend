const { constants } = require('../config');
const getUsernameByBraceletsId = require('./api-gateway/bracelets');
const {
  getSecureContactsByUsername,
} = require('./api-gateway/userSecureContacts');
const AWS = require('aws-sdk');

const ses = new AWS.SES({ region: 'eu-west-1' });

// Extract secure contacts emails
const extractContactsEmails = async (secureContacts) =>
  secureContacts.map((c) => c.contactEmail);

// Send alarm message with SES
const sendAlarm = async (body) => {
  const username = await getUsernameByBraceletsId(body.braceletId);

  // TODO : get secure contacts by username
  const secureContacts = await getSecureContactsByUsername(username);

  const message = `
    <p> Alarm of Fall! You're a secure contact of ${username} </p>
    <p> His/Her current position is : ${body.position}</p>
    <p> Tap <a link> </a></p>
    `;
  /*
  alarm payload 
  {
    BraceletId: body.BraceletId,
      Type: body.Alarm,
      Value: true,
      Position : body.position,
      SecureContacts: secureContacts,
      // TODO : review payload for alarms again
      // TODO : check payload format of secureContacts
  }
  */
  // TODO : send alarm message with SES

  // Create sendEmail params
  var bccAddresses = await extractContactsEmails(secureContacts);

  var params = {
    Destination: {
      /* required */
      BccAddresses: bccAddresses,
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: 'UTF-8',
          Data: message,
        },
        // Text: {
        //   Charset: 'UTF-8',
        //   Data: 'TEXT_FORMAT_BODY',
        // },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Alarm email',
      },
    },
    Source: constants.SENDER_EMAIL_ADDRESS /* required */,
    // ReplyToAddresses: [
    //   'EMAIL_ADDRESS',
    //   /* more items */
    // ],
  };

  const res = await ses.sendEmail(params).promise();
  let a = 5;

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
};

// TODO : create a mock test to send alarm from local
const sendAlarmTest = async () => {
  // TODO : implement send SNS msg test
  const body = {};
  await sendAlarm({
    braceletId : "8e8a89d3-bec2-47ba-8669-437970a6f3f5",
    Type : "LOW_BATTERY",
    Value : 18
  });
};

(async() => {
  await sendAlarmTest();
})()

module.exports = sendAlarm;
