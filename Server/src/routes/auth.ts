import express from 'express';

import { login } from '../actions/login';
import { register } from '../actions/register';
import { logout } from '../actions/logout';

export default (router: express.Router) => {
  router.post('/auth/register', register);
  router.post('/auth/login', login);
  router.post('/auth/logout', logout);
};