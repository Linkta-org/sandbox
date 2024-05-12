import React, { useState } from 'react';
import { Box, Button, Flex } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
import * as Form from '@radix-ui/react-form';
import { Cross2Icon, Pencil2Icon } from '@radix-ui/react-icons';
import './sandboxDialogStyles.css';

const NodeDialog = (setFormData: any) => (
  <Dialog.Root>
    <Flex direction='row' style={{ padding: '20px 0px 20px' }}>
      <Dialog.Trigger asChild>
        <button className="Button violet">Add a Node</button>
      </Dialog.Trigger>
    </Flex>
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay" />
      <Dialog.Content className="DialogContent">
        <Dialog.Title className="DialogTitle">Create a new Node</Dialog.Title>
        <Dialog.Description className="DialogDescription">
          Enter the Node data below.
        </Dialog.Description>

        <Form.Root className='FormRoot' onSubmit={ (e) => setFormData(e.timeStamp) }>
          <Form.Field className="FormField" name="topic">
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <Form.Label className="FormLabel">Topic</Form.Label>
              <Form.Message className="FormMessage" match="valueMissing">
                Please enter a topic
              </Form.Message>
              <Form.Message className="FormMessage" match="typeMismatch">
                Provide a valid topic
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input className="Input" type="text" required />
            </Form.Control>
          </Form.Field>

          <Form.Field className="FormField" name="resource">
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <Form.Label className="FormLabel">Resource</Form.Label>
              <Form.Message className="FormMessage" match="valueMissing">
                Please enter a resource
              </Form.Message>
              <Form.Message className="FormMessage" match="typeMismatch">
                Provide a valid resource
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input className="Input" type="text" required />
            </Form.Control>
          </Form.Field>

          <Form.Field className="FormField" name="duration">
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <Form.Label className="FormLabel">Duration</Form.Label>
              <Form.Message className="FormMessage" match="valueMissing">
                Please enter a duration
              </Form.Message>
              <Form.Message className="FormMessage" match="typeMismatch">
                Provide a valid duration
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input className="Input" type="number" required />
            </Form.Control>
          </Form.Field>

          <button onClick={ (e) => handleButtonClick(e) }>
            <Pencil2Icon /> Add Node
          </button>

          <Form.Submit>
            <Button variant='outline'>
              <Pencil2Icon /> Add Node
            </Button>
          </Form.Submit>
        </Form.Root>


        {/* <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
          <Dialog.Close asChild>
            <button className="Button green">Add Node</button>
          </Dialog.Close>
        </div> */}
        <Dialog.Close asChild>
          <button className="IconButton" aria-label="Close">
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  setTimeout(() => console.log(e.target), 500);
}

const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  console.log(e);
}

export default NodeDialog;