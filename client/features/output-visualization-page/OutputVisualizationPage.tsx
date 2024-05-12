import React from 'react';
import TreeVisualizationBox from './components/TreeVisualizationBox';
import useStore from '@/client/stores/nodeMindMapStore';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const OutputVisualizationPage = () => {
  const saveFlowStateMutation = useMutation({
    mutationFn: () => {
      const { nodes, edges, treeId } = useStore.getState();
      return axios.post(`http://localhost:3000/api/trees/${treeId}`, { nodes, edges });
    },
  });

  return (
    <div>
      <h1>Hello World</h1>
      <button
        onClick={() => saveFlowStateMutation.mutate()}
        className="rounded-md border-2 border-blue-700 bg-blue-300 p-2"
      >
        Save your progress
      </button>
      <TreeVisualizationBox />
    </div>
  );
};

export default OutputVisualizationPage;
