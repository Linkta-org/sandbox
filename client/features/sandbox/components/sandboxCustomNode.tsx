import React from "react";
import { Handle, NodeProps, Position, useReactFlow } from 'reactflow';
import { Box, Flex, IconButton, Text } from '@radix-ui/themes';
import { Cross1Icon } from '@radix-ui/react-icons';


export default function TopicNode({
  data: { id, topic, resource, duration }
}: NodeProps<{ id: string, topic: string, resource: string, duration: number }>) {

  const { setNodes } = useReactFlow();

  return (
    <Flex gap='3' p='3' style={{outline: '1px solid black', borderRadius: '5px'}}>
      <Flex direction='column'>
        <Text size={'1'}>Step# {id}</Text>
        <Text size={'1'}>Duration: {duration} days</Text>
        <Text size={'3'}>Topic: {topic}</Text>
        <Text size={'2'}>Resource: {resource}</Text>
      </Flex>
      <IconButton
        radius="none"
        size='1'
        style={{ background: 'none' }}
        onClick={ () => { setNodes(previousNodes => previousNodes.filter(node => node.id !== id))} }
      >
        <Cross1Icon style={{ color: 'red' }} />
      </IconButton>
      <Handle type='source' position={Position.Bottom} />
      <Handle type='target' position={Position.Top} />
    </Flex>
  );
}

