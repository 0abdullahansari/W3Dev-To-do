import express from 'express';
import { getUserByEmail } from '../db/users';
import { authentication, random } from '../token';
import jwt from 'jsonwebtoken';

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({message: 'Fill in both fields'});
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.status(400).json({message: 'User does not exist'});
    }

    const expectedHash = authentication(
      user.authentication.salt.toString(),
      password
    );

    if (user.authentication.password != expectedHash) {
      return res.status(403).json({message : "Wrong credentials!"});
    }

    const salt = random();
    user.authentication.sessionToken = jwt.sign(user._id.toString(), salt);

    await user.save();

    res.cookie("W3DEVTODO",user.authentication.sessionToken, {
      domain: "localhost",
      httpOnly:true,
      path: "/",
    });

    return res.status(200).json(user.tasks);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
