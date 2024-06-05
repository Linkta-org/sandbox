import type { Node, Edge } from 'reactflow';

function countChildNodes(node: Node, initialNodes: Node[]): number {
  let count = 0;

  for (const child of initialNodes) {
    if (node.id === child.parentId) {
      count++;
      count += countChildNodes(child, initialNodes);
    }
  }
  
  return count;
}

export default function customAutoLayout(
  initialNodes: Node[],
  initialEdges: Edge[],
  nodeWidth: number,
  nodeHeight: number
) {
  initialNodes.sort((a, b) => {
    return Number(a.parentId) - Number(b.parentId);
  });

  const parentObject: { [key: string]: number } = {};
  initialNodes.forEach((node) => {
    if (node.parentId) {
      parentObject[node.parentId] = (parentObject[node.parentId] || 0) + 1;
    }
    node.data.childrenCount = countChildNodes(node, initialNodes);
  });

  const noParentNodes = initialNodes.filter((node) => !node.parentId);
  //if there are multiple nodes without parents, they should be placed away from each other
  if (noParentNodes.length > 1) {
    noParentNodes.forEach((node, index) => {
      node.position = {
        x: index * initialNodes.length * nodeWidth,
        y: 0,
      };
    });
  }

  const layoutedNodes: Node[] = [...initialNodes];

  layoutedNodes.forEach((node) => {
    //no parent nodes are already handled
    if (!node.parentId) {
      return;
    }


    const parent = layoutedNodes.find((n) => n.id === node.parentId);
    const totalChildren = countChildNodes(node, layoutedNodes);
    const totalNodes = layoutedNodes.length;
    const directChildrenCount = parentObject[node.parentId];
  });

  //assuming parent will only need to provide half of the horizontal space
  //two children will be placed side by side, one on each side of the parent
  //going back from the deepest child to the parent
  //the parentObject will be used to determine the position of the parent
  //once the parentObject is returned, can go back to add all the children

  //in total, nodes sharing the same parent, should adjust positions according to siblings and its children
  //the lowest child should be placed at the bottom of the parent

  console.log('parentObject', parentObject);
  console.log('sorted nodes', initialNodes);
  console.log('sorted nodes', initialNodes);
  return { nodes: initialNodes, edges: initialEdges };
}
