import express from 'express';
import { getUserBySessionToken } from '../db/users';
 export const logout = async (req: express.Request, res: express.Response) => {
    try {
        const user = await getUserBySessionToken(req.cookies['W3DEVTODO']);
        user.authentication.sessionToken= null;
        await user.save();
        res.clearCookie('W3DEVTODO');
        return res.status(200).json();
    } catch(error) {
        console.log(error);
        res.status(503).json();
    }
 }