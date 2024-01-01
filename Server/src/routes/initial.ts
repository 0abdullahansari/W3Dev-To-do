import express from 'express';
import { returnData } from '../actions/initial';

export default (router: express.Router)=> {
    router.get('/', returnData);
};