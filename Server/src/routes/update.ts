import express from 'express';

import { addTask } from '../actions/add';
import { deleteTask } from '../actions/delete';
import { toggleTask } from '../actions/toggle';

export default (router: express.Router) => {
  router.patch('/update/add',  addTask);
  router.patch('/update/delete',  deleteTask);
  router.patch('/update/toggle', toggleTask);
};