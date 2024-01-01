import express from "express";
import {  getUserBySessionToken } from "../db/users";

export const deleteTask = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const sessionToken = req.cookies['W3DEVTODO'];

    const user = await getUserBySessionToken(sessionToken);

    const index = user.tasks.findIndex(obj => obj.id === req.body.id);

    user.tasks.splice(index, 1);

    await user.save();

    return res.status(200).json();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};