import React from 'react';
import { Box, Flex } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import './sandboxDialogStyles.css';

const DialogDemo = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <Flex direction='row' style={{ padding: '20px 0px 20px' }}>
        <button className="Button violet">Add a Node</button>
      </Flex>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay" />
      <Dialog.Content className="DialogContent">
        <Dialog.Title className="DialogTitle">Create a new Node</Dialog.Title>
        <Dialog.Description className="DialogDescription">
          Enter the Node data below.
        </Dialog.Description>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="topic">
            Topic
          </label>
          <input className="Input" id="topic" />
        </fieldset>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="resource">
            Resource
          </label>
          <input className="Input" id="resource" />
        </fieldset>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="duration">
            Duration
          </label>
          <input className="Input" id="duration" />
        </fieldset>
        <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
          <Dialog.Close asChild>
            <button className="Button green">Add Node</button>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button className="IconButton" aria-label="Close">
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default DialogDemo;