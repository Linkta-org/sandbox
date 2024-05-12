import express from 'express';
export const LinktaFlowRouter = express.Router();

import {
  // getTreesByUserId,
  deleteTreeByTreeId,
  updateTreeByTreeId,
  getTreeByTreeId
} from '../controllers/linktaFlowController';


// LinktaFlowRouter.get('/:userId', getTreesByUserId);

LinktaFlowRouter.delete('/:treeId', deleteTreeByTreeId);

LinktaFlowRouter.post('/:treeId', updateTreeByTreeId);

LinktaFlowRouter.get('/:treeId', getTreeByTreeId);
