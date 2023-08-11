import {config} from 'dotenv';
config();
import twilio from 'twilio'
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_SERVICE_SID;

const client = twilio(accountSid, authToken);

export const sendOtp = async (number) => {
  try {
    await client.verify.v2
      .services(verifySid)
      .verifications.create({ to: number, channel: "sms" });
  } catch (error) {
    console.log("Failed to send OTP", error);
    throw new Error(error);
  }
};

export const checkOtp = async (otpCode, number) => {
  try {
    const status = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to: number, code: otpCode });
    return status;
  } catch (error) {
    console.log("Failed to check OTP", error);
    throw new Error(error);
  }
};