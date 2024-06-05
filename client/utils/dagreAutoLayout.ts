import dagre from '@dagrejs/dagre';
// Placeholder for initial nodes and edges types
import type { Node, Edge } from 'reactflow';

const setupDagreFlow = () => {
  const dagreFlow = new dagre.graphlib.Graph();
  dagreFlow.setDefaultEdgeLabel(() => ({}));
  dagreFlow.setGraph({ rankdir: 'TB' });
  return dagreFlow;
};

function dagreAutoLayout(
  initialNodes: Node[],
  initialEdges: Edge[],
  nodeWidth: number,
  nodeHeight: number
) {
  const dagreGraph = setupDagreFlow();

  initialNodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  initialEdges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  //already spreaded out the nodes
  dagre.layout(dagreGraph);

  initialNodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);

    if (node.parentId) {
      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
    } else {
      node.position = {
        x: nodeWithPosition.x,
        y: nodeWithPosition.y,
      };
    }
  });

  return { nodes: initialNodes, edges: initialEdges };
}

export default dagreAutoLayout;
