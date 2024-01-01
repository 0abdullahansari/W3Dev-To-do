import express from 'express';

import { login } from '../actions/login';
import { register } from '../actions/register'

export default (router: express.Router) => {
  router.post('/auth/register', register);
  router.post('/auth/login', login);
};