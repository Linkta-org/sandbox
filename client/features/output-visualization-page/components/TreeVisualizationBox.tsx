import React from 'react';
import { useState, useCallback } from 'react';
import type { NodeChange, EdgeChange, Connection, Edge } from 'reactflow';
import ReactFlow, {
  Background,
  Controls,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';

interface Node {
  id: string;
  position: { x: number; y: number };
  type?: string;
  data: { label: string };
}

const initialNodes: Node[] = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: 'Node 1' },
  },
  {
    id: '2',
    position: { x: 5, y: 5 },
    data: { label: 'Node 1' },
  },
];

const initialEdges: Edge[] = [
  { id: '1-2', source: '1', target: '2', type: 'smoothstep' },
];

const TreeVisualizationBox = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <div style={{ height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default TreeVisualizationBox;
