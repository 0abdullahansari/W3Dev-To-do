import express from "express";
import {  getUserBySessionToken } from "../db/users";

export const addTask = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const sessionToken = req.cookies['W3DEVTODO'];

    const user = await getUserBySessionToken(sessionToken);

    user.tasks.push(req.body.newtask);

    await user.save();

    return res.status(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};





