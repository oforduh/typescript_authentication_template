import { DocumentType } from "@typegoose/typegoose";
import crypto from "crypto";
import PasswordResetModel from "../model/passwordResetToken.model";
import { User } from "../model/user.model";

export const generatePasswordResetToken = async (
  user: DocumentType<User>
): Promise<string | null> => {
  try {
    let resetPasswordToken = crypto.randomBytes(10).toString("hex");
    const resetPasswordExpires = Date.now() + 3600000; //expires in an hour
    const userId = user._id;
    const newData = new PasswordResetModel({
      resetPasswordToken,
      resetPasswordExpires,
      user: userId,
    });
    await newData.save();
    resetPasswordToken = `${resetPasswordToken}.${userId}`;
    return resetPasswordToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};
