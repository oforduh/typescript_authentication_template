import UserModel, { UserToken } from "./../model/user.model";
import { NotAuthorizedError } from "./../errors/notAuthorizedError.error";
import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

interface JwtPayload {
  _id: string;
  iat: number;
  exp: number;
}

export interface Payload extends mongoose.Document {
  _id: string;
  email: string;
  phoneNumber: string;
  password: string;
  tokens: UserToken[];
}

declare global {
  namespace Express {
    interface Request {
      user: Payload;
      token: string;
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token: string | undefined = req.header("Authorization");

    // checks if there is a token
    if (!token)
      throw new NotAuthorizedError(
        "you are not authorized to perform this operation"
      );

    // get the token and verify it authentication
    token = token.replace("Bearer ", "");
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as Secret
    ) as JwtPayload;

    // checks if the owner of the token exists
    const user = await UserModel.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user)
      throw new NotAuthorizedError(
        "you are not authorized to perform this operation"
      );

    // declare global{} and add the token and user to the request object
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    throw error;
  }
};
