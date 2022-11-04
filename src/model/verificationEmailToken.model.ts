import {
  getModelForClass,
  modelOptions,
  prop,
  Severity,
  Ref,
} from "@typegoose/typegoose";
import { User } from "./user.model";

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: {
      transform(doc: any, ret: any) {
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
export class VerificationEmail {
  @prop({})
  verifyEmailExpires: string;

  @prop({})
  verifyEmailToken: string;

  @prop({ required: true, ref: () => User })
  user: Ref<User>;
}

const VerificationEmailModel = getModelForClass(VerificationEmail);

export default VerificationEmailModel;
