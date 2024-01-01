import express from "express";
import { getUserBySessionToken } from "../db/users";

export const returnData = async (req: express.Request, res: express.Response) => {
    if(!req.cookies['W3DEVTODO'])
    return res.status(200).json();
    const userData = await getUserBySessionToken(req?.cookies?.['W3DEVTODO']);
    const data = userData?.toJSON();
    return res.status(200).json(data);
}