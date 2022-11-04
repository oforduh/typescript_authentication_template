import { MailParams } from "./../../emails/config/sendGrid.config";
import { UserToken } from "./../../model/user.model";
import { Request, Response } from "express";
import response from "../../helpers/responses";
import UserModel, { User } from "../../model/user.model";
import { sendWelcomeMail } from "../../emails/config/sendGrid.config";
import { capitalizeFirstLetter as cfl } from "../../helpers/capitalizeFirstLetters";
import { generateConfirmationToken } from "../../helpers/generateEmailConfirmationToken";
import VerificationEmailModel from "../../model/verificationEmailToken.model";
import bcrypt from "bcryptjs";

export const signUp = async (req: Request, res: Response) => {
  const input: Partial<User> = req.body;

  try {
    const password = input.password;
    if (password!.toLowerCase().includes("password")) {
      response.notAllowed({
        res,
        message: "Password cannot contain password",
      });
    }
    const newUser = await UserModel.create(input);

    const name = `${cfl(newUser.fName)} ${cfl(newUser.lName)}`;
    const email = `${newUser.email}`;
    const EmailToken = await generateConfirmationToken(newUser);
    const link = `http://${req.headers.host}/v1/auth/${EmailToken}/verifyEmail`;

    const args: MailParams = {
      name,
      email,
      link: link,
    };
    const token = await newUser.generateAuthToken();
    sendWelcomeMail(args);

    response.successfulRequest({
      res,
      message: "registered new user",
      entity: "newUser",
      data: { newUser, token },
    });
  } catch (error: any) {
    throw error;
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const token = req.params.token;
    const verifyEmailToken = token.split(".")[0];
    const user_id = token.split(".")[1];
    const is_match = await VerificationEmailModel.findOne({
      user: user_id,
      verifyEmailToken,
      verifyEmailExpires: { $gt: Date.now() },
    });
    console.log(is_match);

    if (!is_match)
      return response.notFound({
        res,
        message: "Password reset token is invalid or has expired",
      });

    const getUser = await UserModel.findById({ _id: user_id });
    getUser!.isVerified = true;
    await getUser!.save();
    getUser!.isVerified = true;

    response.successfulRequest({
      res,
      message: "Email has been verified",
    });
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const user = await UserModel.findByCredentials(email, password);

    if (!user)
      return response.badRequest({
        res,
        message: "incorrect login credentials",
      });

    const token = await user!.generateAuthToken();

    response.successfulRequest({
      res,
      message: "User signed in",
      entity: "signin",
      data: { user, token },
    });
  } catch (error) {
    throw error;
  }
};

export const signOut = async (req: Request, res: Response) => {
  try {
    const { user, token: requestToken } = req;

    user!.tokens = user!.tokens.filter((token: UserToken) => {
      return token.token !== requestToken;
    });

    await user!.save();

    response.successfulRequest({
      res,
      message: "User Signed Out",
    });
  } catch (error) {
    throw error;
  }
};

export const handleLogoutAllDevices = async (req: Request, res: Response) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send({ message: "Logged out successfully on all devices" });
  } catch (e) {
    res.status(500).send();
  }
};

export const change_password = async (req: Request, res: Response) => {
  const user = req.user;

  try {
    const { old_password, new_password } = req.body;

    const is_match = await bcrypt.compare(old_password, user.password);
    const same_password = await bcrypt.compare(new_password, user.password);

    if (!is_match)
      return response.badRequest({
        res,
        message: "Incorrect Password",
        error: "Could not update password",
      });

    if (same_password)
      return response.badRequest({
        res,
        message: "New Password cannot be the same as the old password",
        error: "Could not update password",
      });

    user.password = new_password;
    await user.save();

    response.resourceCreated({
      res,
      message: "Password updated successfully",
    });
  } catch (error) {
    throw error;
  }
};

export const test = async (req: Request, res: Response) => {
  try {
    response.successfulRequest({
      res,
      message: "testing api",
    });
  } catch (error) {
    throw error;
  }
};
