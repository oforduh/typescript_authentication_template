import express from "express";
import { auth } from "../../middlewares/auth";

import { validateRequest } from "../../middlewares/validateRequest";
import {
  signUp,
  signIn,
  signOut,
  verifyEmail,
  handleLogoutAllDevices,
  change_password,
  test,
} from "./auth.controller";
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
  //    * @requestBody {String} username         User's username
  //    * @requestBody {String}   email         User's email
  //    * @requestBody {String}   fName     
  User's first name    
  //    * @requestBody {String}   lName      
  User's last name
  //    * @requestBody {String}   phoneNumber   User's phonenumber      
  //    * @requestBody {String}   password      User's password

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
  //    * @api {post} /signin
  //    * @apiDescription Creates a user
  //    * @apiVersion 1.0.0
  //    * @apiName Create User
  //    * @apiGroup Auth
  //    * @apiPermission public
  //    * @requestBody {String}   email         User's email  
  //    * @requestBody {String}   password      User's password
  //    * @returns  {object}  
  //    * @apiSuccess {object}  user
  //    * @apiSuccess {String}  token
  //    *
  //    * @apiError (Forbidden 500)    Internal Server Error    Server encountered issues
*/
  .post(signinSchema, validateRequest, signIn);

router
  .route("/logout")
  /**
  //    * @public
  //    * @api {post} /logout
  //    * @apiDescription Creates a user
  //    * @apiVersion 1.0.0
  //    * @apiName logout user
  //    * @apiGroup Auth
  //    * @apiPermission authorized user

  //    * @returns  {object}
  //    * @apiError (Forbidden 500)    Internal Server Error    Server encountered issues
*/
  .post(auth, signOut);

router
  .route("/logout_universal")
  /**
  //    * @public
  //    * @api {get} /logout_universal
  //    * @apiDescription logs a user out on all devices
  //    * @apiVersion 1.0.0
  //    * @apiName logout user
  //    * @apiGroup Auth
  //    * @apiPermission authorized user

  //    * @returns  {object}
  //    * @apiError (Forbidden 500)    Internal Server Error    Server encountered issues
*/
  .get(auth, handleLogoutAllDevices);

router
  .route("/:token/verifyEmail")
  /**
  //    * @public
  //    * @api {get} /:token/verify
  //    * @apiDescription verifies a user email when the link is clicked
  //    * @apiVersion 1.0.0
  //    * @apiName verify user Email
  //    * @apiGroup private
  //    * @apiPermission private

  //    * @returns  {object}
  //    * @apiError (Forbidden 500)    Internal Server Error    Server encountered issues
*/
  .get(verifyEmail);

router
  .route("/reset_pwd")
  /**
  //    * @public
  //    * @api {get} /verify
  //    * @apiDescription verifies a user email when the link is clicked
  //    * @apiVersion 1.0.0
  //    * @apiName verify user Email
  //    * @apiGroup private
  //    * @apiPermission private

  //    * @returns  {object}
  //    * @apiError (Forbidden 500)    Internal Server Error    Server encountered issues
*/
  .post(change_password);

router.route("/test").get(auth, test);

export default router;
