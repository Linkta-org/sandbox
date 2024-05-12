import type { Request, Response } from 'express';
import { LinktaFlow } from '@/server/models/Schemas';

// export const getTreesByUserId = (req: Request, res: Response) => {
//   console.log('HIT')
//   res.send('get user trees for userID: ' + req.params.userId);
// }

export const deleteTreeByTreeId = (req: Request, res: Response) => {
  console.log('HIT');
  res.send('delete tree with treeID: ' + req.params.treeId);
};

export const updateTreeByTreeId = async (req: Request, res: Response) => {
  const treeId = req.params.treeId;
  const treeUpdate = req.body;
  const response = await LinktaFlow.findByIdAndUpdate(treeId, treeUpdate);

  console.log('HIT, getting tree data updates');
  console.log(response);

  res.send(response);
};

export const getTreeByTreeId = async (req: Request, res: Response) => {
  console.log(req.params.treeId);

  const treeId = req.params.treeId;
  const linktaFlow = await LinktaFlow.findById(treeId).populate([
    'nodes',
    'edges',
  ]);

  console.log('HIT');
  console.log(linktaFlow);

  res.send(linktaFlow);
};
