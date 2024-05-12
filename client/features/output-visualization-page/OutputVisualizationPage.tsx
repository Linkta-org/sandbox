import React, { useState } from 'react';
import SandboxReactFlow from '../sandbox/components/sandboxReactFlow';
import NodeDialog from '../sandbox/components/sandboxNodeDialog';

const OutputVisualizationPage = () => {

  const [ formData, setFormData ] = useState(undefined);

  return (
    <>
      <div>OutputVisualizationPage Placeholder</div>
      <div>{ formData }</div>
      <NodeDialog setFormData={ setFormData }></NodeDialog>
      <SandboxReactFlow></SandboxReactFlow>
    </>
  )
};

export default OutputVisualizationPage;
