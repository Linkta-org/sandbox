import { Edge, Node } from 'reactflow';

export const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
];

export const initialNodes: Node[] = [
  { id: '1', position: { x: 300, y: 0 }, data: {
    id: '1',
    topic: 'Node.js',
    resource: 'node.com',
    duration: 10
  }, type: 'topicNode' },
  { id: '2', position: { x: 100, y: 200 }, data: {
    id: '2',
    topic: 'REST architecture',
    resource: 'mdn.com',
    duration: 3
  }, type: 'topicNode' },
  { id: '3', position: { x: 400, y: 200 }, data: {
    id: '3',
    topic: 'Express.js',
    resource: 'express.com',
    duration: 5
  }, type: 'topicNode' },
  { id: '4', position: { x: 300, y: 400 }, data: {
    id: '4',
    topic: 'Mongoose',
    resource: 'mongoose.net',
    duration: 2
  }, type: 'topicNode' },
];


// const initialNodes: Node[] = [
//   { id: '0', position: { x: 200, y: 0 }, data: { label: 'Custom' } },
//   { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
//   { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
//   { id: '3', position: { x: 50, y: 200 }, data: { label: '3' } },
//   { id: '4', position: { x: 150, y: 300 }, data: { label: '4' } },
//   { id: '5', position: { x: 300, y: 400 }, data: { label: '5' } },
//   { id: 'Z', position: { x: 700, y: 150 }, data: { label: 'Z' } },
//   {
//     id: '2-1',
//     data: {},
//     type: 'group',
//     position: {
//       x: 250,
//       y: 50,
//     },
//     style: {
//       width: 380,
//       height: 180,
//       backgroundColor: 'rgba(208, 192, 247, 0.2)',
//     },
//   },
//   {
//     id: 'Q',
//     data: {
//       label: 'Imprisoned Node',
//     },
//     type: 'tools',
//     position: { x: 50, y: 50 },
//     style: {
//       width: 80,
//       height: 80,
//       background: 'rgb(208, 192, 247)',
//     },
//     parentId: '2-1',
//     extent: 'parent',
//   },
// ];

// const initialEdges: Edge[] = [
//   { id: 'e1-2', source: '1', target: '2' },
//   { id: 'e2-3', source: '2', target: '3' },
//   { id: 'e3-4', source: '3', target: '4' },
//   { id: 'e4-5', source: '4', target: '5' },
//   { id: 'e5-Z', source: '5', target: 'Z' },
//   { id: 'eZ-1', source: 'Z', target: '1' },
//   { id: 'e1-Q', source: '1', target: 'Q', animated: true },
//   { id: 'eQ-5', source: 'Q', target: '5', animated: true },
// ];