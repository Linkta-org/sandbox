import React, { useState } from 'react';
import SandboxReactFlow from './components/sandboxReactFlow';
import NodeDialog from './components/sandboxNodeDialog';

const SandboxPage = () => {

  const [ formData, setFormData ] = useState(undefined);

  return (
    <>
      <div>{ formData }</div>
      <NodeDialog setFormData={ setFormData }></NodeDialog>
      <SandboxReactFlow></SandboxReactFlow>
    </>
  )
};

export default SandboxPage;
