import express from 'express';

import authentication from './auth';
import update from './update';
import initial from './initial';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  update(router);
  initial(router);
  return router;
};