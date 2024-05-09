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
  addEdge
} from 'reactflow';
import 'reactflow/dist/style.css';
import './sandboxOverview.css';
import TopicNode from './sandboxCustomNode';
import { initialEdges, initialNodes } from './sandboxReactFlowConstants';

const nodeTypes = {
  topicNode: TopicNode
}

export default function SandboxReactFlow() {

  const [ nodes, setNodes, onNodesChange ] = useNodesState(initialNodes);
  const [ edges, setEdges, onEdgesChange ] = useEdgesState(initialEdges);

  const onConnect = useCallback((connection: Connection) => {
    const edge = { ...connection, animated: true, id: `${edges.length} + 1`};
    setEdges(previousEdges => addEdge(edge, previousEdges))
  }, [])

  return (
    <div style={{ width: '1000px', height: '65vh', border: '1px solid black' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Lines} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
