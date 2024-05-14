import React, { useState } from 'react';
import SandboxReactFlow from './components/sandboxReactFlow';
import NodeDialog from './components/sandboxNodeDialog';

export interface CreateNodeData {
  topic: string,
  resource: string,
  duration: number
}

const SandboxPage = () => {

  return (
    <>
      <NodeDialog></NodeDialog>
      <SandboxReactFlow></SandboxReactFlow>
    </>
  )
};

export default SandboxPage;
