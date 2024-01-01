import express from "express";
import { getUserBySessionToken } from "../db/users";

export const returnData = async (req: express.Request, res: express.Response) => {
    const userData = await getUserBySessionToken(req?.cookies?.['W3DEVTODO']);
    console.log(userData);
    const data = userData?.toJSON();
    return res.status(200).json(data);
}