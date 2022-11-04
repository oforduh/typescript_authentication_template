import sgMail from "@sendgrid/mail";
import { welcomeHtml } from "../templates/welcomeHtml";
import dotenv from "dotenv";
dotenv.config();

const SG_API_KEY = process.env.SG_API_KEY!;
const SENDER_EMAIL = process.env.SENDER_EMAIL!;

sgMail.setApiKey(SG_API_KEY);

export interface MailParams {
  email?: string;
  name?: string;
  link: string | null;
}

export const sendWelcomeMail = async (args: MailParams) => {
  const msg = {
    to: args.email,
    from: {
      email: SENDER_EMAIL,
      name: "Harrison from send Grid",
    },
    subject: "Welcome to the App",
    html: `${welcomeHtml(args)}`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
