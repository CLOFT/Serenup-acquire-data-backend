const { constants } = require('../config');
const getUsernameByBraceletsId = require('./api-gateway/bracelets');
const getSecureContactsByUsername = require('./api-gateway/userSecureContacts');
const AWS = require('aws-sdk');

const sns = new AWS.SNS({ region: 'eu-west-1' });

// Extract secure contacts emails
const extractContactsEmails = async (secureContacts) =>
  secureContacts.map((c) => c.contactEmail);

// Send alarm message with SNS
const sendAlarm = async (body) => {
  console.log('body', body);
  try {
    const username = await getUsernameByBraceletsId(body.BraceletId);

    console.log('username', username);
    const secureContacts = await getSecureContactsByUsername(username);

    console.log('secureContacts : ', secureContacts);

    const link = constants.MAPS_SEARCH_LINK + encodeURIComponent(body.Position);
    const message = `
    Alarm of Fall! You're a secure contact of ${username} 
    Tap here to find your friend --> ${link}
    `;

    // Create SNS body
    var params = {
      Message: message /* required */,
      Subject: 'Fall Alarm',
      TopicArn: constants.TOPIC_ARN,
    };

    // Send email alarm
    const response = await sns.publish(params).promise();
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendAlarm;
