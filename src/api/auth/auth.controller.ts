import { Request, Response, NextFunction } from "express";
import response from "../../middlewares/responses";
import UserModel, { User } from "../../model/user.model";

export const createUser = async (req: Request, res: Response) => {
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
    response.successfulRequest({
      res,
      message: "Created new user",
      entity: "newUser",
      data: newUser,
    });
  } catch (error: any) {
    throw error;
  }
};
