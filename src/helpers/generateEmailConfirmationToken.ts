import VerificationEmailModel from "../model/verificationEmailToken.model";
import { DocumentType } from "@typegoose/typegoose";

import crypto from "crypto";
import UserModel, { User } from "../model/user.model";

export const generateConfirmationToken = async (
  user: DocumentType<User>
): Promise<string | null> => {
  try {
    let verifyEmailToken = crypto.randomBytes(10).toString("hex");
    const verifyEmailExpires = Date.now() + 3600000; //expires in an hour
    const userId = user._id;
    const newData = new VerificationEmailModel({
      verifyEmailToken,
      verifyEmailExpires,
      user: userId,
    });
    await newData.save();
    verifyEmailToken = `${verifyEmailToken}.${userId}`;
    return verifyEmailToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};
