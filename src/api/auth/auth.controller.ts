import { Request, Response } from "express";
import response from "../../middlewares/responses";
import UserModel, { User } from "../../model/user.model";

export const signUp = async (req: Request, res: Response) => {
  const input: Partial<User> = req.body;

  try {
    let password = input.password;
    if (password!.toLowerCase().includes("password")) {
      response.notAllowed({
        res,
        message: "Password cannot contain password",
      });
    }
    const newUser = await UserModel.create(input);
    const token = await newUser.generateAuthToken();

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

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const user = await UserModel.findByCredentials(email, password);

    console.log(user);

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
