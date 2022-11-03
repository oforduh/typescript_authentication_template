import mongoose from "mongoose";
import {
  getModelForClass,
  modelOptions,
  prop,
  Severity,
  index,
  pre,
  DocumentType,
  ReturnModelType,
} from "@typegoose/typegoose";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import response from "../middlewares/responses";
import { Response } from "express";

interface UserToken {
  token: string;
}

@index({ email: 1 })
@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: {
      transform(doc: any, ret: any) {
        console.log(ret);
        ret.id = ret._id;
        delete ret._id;
        delete ret.updatedAt;
        delete ret.createdAt;
        delete ret.tokens;
      },
      versionKey: false,
    },
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@pre<User>("save", async function () {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
    return;
  }
})
export class User {
  @prop({
    required: true,
    unique: true,
  })
  username: string;

  @prop({
    lowercase: true,
    required: true,
    unique: true,
  })
  email: string;

  @prop({
    required: true,
    trim: true,
  })
  password: string;

  @prop({ required: true, trim: true })
  fName: string;

  @prop({ required: true, trim: true })
  lName: string;

  @prop({ required: true, unique: true })
  phoneNumber: string;

  @prop({})
  tokens: UserToken[];

  // Generate jwt auth token for user instance
  public async generateAuthToken(this: DocumentType<User>) {
    const user = this;
    const _id = user._id.toString();

    const token = jwt.sign({ _id }, process.env.JWT_SECRET as Secret);

    // concat this is used to put an object inside an array
    user.tokens = user.tokens.concat({ token });

    await user.save();

    return token;
  }

  // check if the credentials already exist in the database using static method
  public static async findByCredentials(
    // the "this" definition is required to have the correct types
    this: ReturnModelType<typeof User>,
    email: string,
    password: string
  ) {
    // validation check for email
    const user = await this.findOne({
      email,
    });
    if (!user) return null;
    console.log("email test passed");

    // validation check for password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;
    console.log("password test passed");
    return user;
  }
}

const UserModel = getModelForClass(User);

export default UserModel;
