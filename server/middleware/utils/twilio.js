// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
import {config} from 'dotenv';
config()
const {TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN,TWILIO_PHONE_NUMBER}=process.env
import twilio from 'twilio'

const client = twilio(TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN);


export const sendOtp = (phone, message) => {
    client.messages
      .create({
         body: message,
         from: TWILIO_PHONE_NUMBER,
         to: `+91${phone}`
       })
      .then(message => console.log(message.sid))
      .catch(error => console.error('Error sending SMS:', error));
  }

