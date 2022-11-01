import {
  getModelForClass,
  modelOptions,
  prop,
  Severity,
  index,
  pre,
} from "@typegoose/typegoose";
import bcrypt from "bcryptjs";

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
}

const UserModel = getModelForClass(User);

export default UserModel;
