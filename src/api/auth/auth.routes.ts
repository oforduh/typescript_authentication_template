import express from "express";

import { validateRequest } from "../../middlewares/validateRequest";
import { signUp, signIn } from "./auth.controller";
import { createUserSchema, signinSchema } from "./auth.schema";

const router = express.Router();

router
  .route("/signup")
  /**
  //    * @public
  //    * @api {post} /signup
  //    * @apiDescription Creates a user
  //    * @apiVersion 1.0.0
  //    * @apiName Create User
  //    * @apiGroup Auth
  //    * @apiPermission public
  //    *
  //    * @requestBody {String}   email         User's email
  //    * @requestBody {String}   firstName     User's first name    
  //    * @requestBody {String}   lastName      User's last name
  //    * @requestBody {String}   phonenumber   User's phonenumber      
  //    * @requestBody {String}   password      User's password
  //    * @requestBody {String}   passwordConfirmation      User's password confirmation
  //    *
  //    * @returns  {object}  
  //    * @apiSuccess {object}  user
  //    * @apiSuccess {String}  token
  //    *
  //    * @apiError (Forbidden 500)    Internal Server Error    Server encountered issues
*/
  .post(createUserSchema, validateRequest, signUp);

router
  .route("/signin")
  /**
  //    * @public
  //    * @api {post} /signup
  //    * @apiDescription Creates a user
  //    * @apiVersion 1.0.0
  //    * @apiName Create User
  //    * @apiGroup Auth
  //    * @apiPermission public
  //    *
  //    * @requestBody {String}   email         User's email
  //    * @requestBody {String}   firstName     User's first name    
  //    * @requestBody {String}   lastName      User's last name
  //    * @requestBody {String}   phonenumber   User's phonenumber      
  //    * @requestBody {String}   password      User's password
  //    * @requestBody {String}   passwordConfirmation      User's password confirmation
  //    *
  //    * @returns  {object}  
  //    * @apiSuccess {object}  user
  //    * @apiSuccess {String}  token
  //    *
  //    * @apiError (Forbidden 500)    Internal Server Error    Server encountered issues
*/
  .post(signinSchema, validateRequest, signIn);

export default router;
