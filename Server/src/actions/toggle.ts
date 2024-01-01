import express from "express";
import {  getUserBySessionToken } from "../db/users";

export const toggleTask = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const sessionToken = req.cookies['W3DEVTODO'];

    const user = await getUserBySessionToken(sessionToken);

    const index = user.tasks.findIndex(obj => obj.id === req.body.id);

    user.tasks[index].pending = !user.tasks[index].pending;

    await user.save();

    return res.status(200).json();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};