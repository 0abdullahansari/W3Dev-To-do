import express from "express";
import { random, authentication } from "../token";
import { getUserByEmail, createUser } from "../db/users";
import jwt from "jsonwebtoken";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    
    if (!email || !password ) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();
    const newUser = await createUser({
      email,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    const user = await getUserByEmail(email);
    user.authentication.sessionToken = jwt.sign(user._id.toString(), salt,);

    await user.save();
    
    res.cookie("W3DEVTODO", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });
    

    return res.status(200).json();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
