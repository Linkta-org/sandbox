import { Box, TextField } from '@radix-ui/themes';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '@/client/stores/nodeMindMapStore';

interface PromptPayload {
  prompt: string;
}

const PromptInputForm = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const newPromptMutation = useMutation({
    mutationFn: async (userInput: PromptPayload) => {
      const response = await axios.post('http://localhost:3000/gen-ai/query', {
        prompt: userInput.prompt,
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log('Prompt sent successfully', data);
      const parsedData = JSON.parse(data.response);
      const nodes = parsedData.nodes;
      const edges = parsedData.edges;
      useStore.setState({
        nodes: nodes,
        edges: edges,
      });
      navigate('/output');
    },
    onError: (error) => {
      console.error('Error sending prompt: ', error);
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    newPromptMutation.mutate({ prompt: inputValue });
  };

  return (
    <div className="mt-48">
      <Box maxWidth="200px">
        <TextField.Root
          type="text"
          placeholder="Enter your prompt"
          value={inputValue}
          onChange={handleChange}
        />
      </Box>
      <button
        className="border-2"
        onClick={handleSubmit}
      >
        Generate
      </button>
    </div>
  );
};

export default PromptInputForm;
