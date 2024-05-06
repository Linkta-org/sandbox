import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  Connection,
  addEdge,

} from 'reactflow';

import 'reactflow/dist/style.css';
import './sandboxOverview.css';


const initialNodes: Node[] = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' }, draggable: true, dragging: true },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  { id: '3', position: { x: 50, y: 200 }, data: { label: '3' } },
  { id: '4', position: { x: 150, y: 300 }, data: { label: '4' } },
  { id: '5', position: { x: 300, y: 400 }, data: { label: '5' } },
  { id: 'Z', position: { x: 700, y: 150 }, data: { label: 'Z' } },
  {
    id: '2-1',
    data: {},
    type: 'group',
    position: {
      x: 250,
      y: 50,
    },
    style: {
      width: 380,
      height: 180,
      backgroundColor: 'rgba(208, 192, 247, 0.2)',
    },
  },
  {
    id: 'Q',
    data: {
      label: 'Imprisoned Node',
    },
    type: 'tools',
    position: { x: 50, y: 50 },
    style: {
      width: 80,
      height: 80,
      background: 'rgb(208, 192, 247)',
    },
    parentId: '2-1',
    extent: 'parent',
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4', source: '3', target: '4' },
  { id: 'e4-5', source: '4', target: '5' },
  { id: 'e5-Z', source: '5', target: 'Z' },
  { id: 'eZ-1', source: 'Z', target: '1' },
  { id: 'e1-Q', source: '1', target: 'Q', animated: true },
  { id: 'eQ-5', source: 'Q', target: '5', animated: true },
];

export default function SandboxReactFlow() {
  const [ nodes, setNodes, onNodesChange ] = useNodesState(initialNodes);
  const [ edges, setEdges, onEdgesChange ] = useEdgesState(initialEdges);
  const onConnect = useCallback((connection: Connection) => {
    const edge = { ...connection, animated: true, id: `${edges.length} + 1`};
    setEdges(previousEdges => addEdge(edge, previousEdges))
  }, [])

  return (
    <div style={{ width: '1000px', height: '800px', border: '1px solid black' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Lines} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
