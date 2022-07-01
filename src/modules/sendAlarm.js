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
  try {
    const username = await getUsernameByBraceletsId(body.braceletId);

    const secureContacts = await getSecureContactsByUsername(username);

    const link = constants.MAPS_SEARCH_LINK + encodeURIComponent(body.position);
    const message = `
      Alarm of Fall! You're a secure contact of ${username} 
      Tap here to see your friend's position --> ${link}
      `;

    // prepare params for SNS message

    var params = {
      Message: message,
      Subject: 'Fall Alarm',
      TopicArn: constants.TOPIC_ARN,
    };

    // Publish message

    const res = await sns.publish(params).promise();
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendAlarm;
