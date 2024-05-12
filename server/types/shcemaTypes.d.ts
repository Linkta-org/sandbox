import type { Document, Types } from 'mongoose';
import type { Node, Edge } from 'reactflow';

export interface UserType extends Document {
  _id: Types.ObjectId;
  // firebaseId: string;
  // email: string;
  firstName: string;
  lastName: string;
  linktaFlows: Types.ObjectId[];
}

export interface LinktaFlowType {
  nodes: Node[];
  edges: Edge[];
  userInputId: Types.ObjectId;
  userId: Types.ObjectId;
}

export interface UserInputType extends Document {
  input: string;
}
