import type {
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnNodesChange,
  OnEdgesChange,
  XYPosition,
} from 'reactflow';

import { applyNodeChanges, applyEdgeChanges } from 'reactflow';
import { createWithEqualityFn } from 'zustand/traditional';
import { nanoid } from 'nanoid/non-secure';
import dagreAutoLayout from '@/client/utils/dagreAutoLayout';
import customAutoLayout from '../utils/customAutoLayout';

export type RFState = {
  treeId: string;
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  addChildNode: (parentNode: Node, position: XYPosition) => void;
  updateNodeLabel: (nodeId: string, label: string) => void;
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'System Design' },
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    data: { label: 'Principles' },
    position: { x: 0, y: 0 },
    parentId: '1',
  },
  {
    id: '3',
    data: { label: 'Patterns' },
    position: { x: 0, y: 0 },
    parentId: '1',
  },
  {
    id: '4',
    data: { label: 'Scalability' },
    position: { x: 0, y: 0 },
    parentId: '2',
  },
  {
    id: '5',
    data: { label: 'Reliability' },
    position: { x: 0, y: 0 },
    parentId: '2',
  },
  {
    id: '6',
    data: { label: 'MVC' },
    position: { x: 0, y: 0 },
    parentId: '3',
  },
  {
    id: '7',
    data: { label: 'Microservices' },
    position: { x: 0, y: 0 },
    parentId: '3',
  },
  {
    id: '8',
    data: { label: 'Micro' },
    position: { x: 0, y: 0 },
    parentId: '3',
  },
  {
    id: '9',
    data: { label: 'test' },
    position: { x: 0, y: 0 },
    parentId: '3',
  },
  {
    id: '10',
    data: { label: 'test' },
    position: { x: 0, y: 0 },
    parentId: '9',
  },
  {
    id: '11',
    data: { label: 'test' },
    position: { x: 0, y: 0 },
    parentId: '9',
  },
];
const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
  { id: 'e1-3', source: '1', target: '3', type: 'smoothstep' },
  { id: 'e2-4', source: '2', target: '4', type: 'smoothstep' },
  { id: 'e2-5', source: '2', target: '5', type: 'smoothstep' },
  { id: 'e3-6', source: '3', target: '6', type: 'smoothstep' },
  { id: 'e3-7', source: '3', target: '7', type: 'smoothstep' },
  { id: 'e3-8', source: '3', target: '8', type: 'smoothstep' },
  { id: 'e3-9', source: '3', target: '9', type: 'smoothstep' },
  { id: 'e9-10', source: '9', target: '10', type: 'smoothstep' },
  { id: 'e9-11', source: '9', target: '11', type: 'smoothstep' },
];

dagreAutoLayout(initialNodes, initialEdges, 200, 100);
customAutoLayout(initialNodes, initialEdges, 200, 100);

const useStore = createWithEqualityFn<RFState>((set, get) => ({
  treeId: '663bfa27e3b94f9783b2ffb3',
  nodes: initialNodes,
  edges: initialEdges,
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  addChildNode: (parentNode: Node, position: XYPosition) => {
    const newNode = {
      id: nanoid(),
      type: 'mindmap',
      data: { label: 'New Node' },
      position,
      parentId: parentNode.id,
    };

    const newEdge = {
      id: nanoid(),
      source: parentNode.id,
      target: newNode.id,
    };

    set({
      nodes: [...get().nodes, newNode],
      edges: [...get().edges, newEdge],
    });
  },

  updateNodeLabel: (nodeId: string, label: string) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, label };
        }
        return node;
      }),
    });
  },
}));

export default useStore;
