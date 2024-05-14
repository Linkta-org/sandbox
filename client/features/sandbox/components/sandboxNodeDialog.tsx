import React, { useState } from 'react';
import { Flex } from '@radix-ui/themes';
import * as Dialog from '@radix-ui/react-dialog';
import * as Form from '@radix-ui/react-form';
import './sandboxDialogStyles.css';


function NodeDialog() {
  const [open, setOpen] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.currentTarget));
    console.log('HANDLE SUBMIT ', formData);
    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Flex direction='row' style={{ padding: '20px 0px 20px' }}>
        <Dialog.Trigger asChild>
          <button className='Button violet' color='--gray-5'>Add a Node</button>
        </Dialog.Trigger>
      </Flex>
      <Dialog.Portal>
        <Dialog.Overlay className='DialogOverlay' />
        <Dialog.Content className='DialogContent'>
          <Dialog.Title className='DialogTitle'>Create a new Node</Dialog.Title>
          <Dialog.Description className='DialogDescription'>
            Enter the Node data below.
          </Dialog.Description>

          <Form.Root className='FormRoot' onSubmit={handleSubmit} >
            <fieldset>
              <Form.Field className='FormField' name='topic'>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <Form.Label className='FormLabel'>Topic</Form.Label>
                  <Form.Message className='FormMessage' match='valueMissing'>
                    Please enter a topic
                  </Form.Message>
                  <Form.Message className='FormMessage' match='typeMismatch'>
                    Provide a valid topic
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input className='Input' type='text' required />
                </Form.Control>
              </Form.Field>

              <Form.Field className='FormField' name='resource'>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <Form.Label className='FormLabel'>Resource</Form.Label>
                  <Form.Message className='FormMessage' match='valueMissing'>
                    Please enter a resource
                  </Form.Message>
                  <Form.Message className='FormMessage' match='typeMismatch'>
                    Provide a valid resource
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input className='Input' type='text' />
                </Form.Control>
              </Form.Field>

              <Form.Field className='FormField' name='duration'>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <Form.Label className='FormLabel'>Duration</Form.Label>
                  <Form.Message className='FormMessage' match='valueMissing'>
                    Please enter a duration
                  </Form.Message>
                  <Form.Message className='FormMessage' match='typeMismatch'>
                    Provide a valid duration
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input className='Input' type='number' />
                </Form.Control>
              </Form.Field>
            </fieldset>

            <Flex className='buttonGroup' display='flex' justify='end'>
              <Dialog.Close asChild>
                <button className='Button violet' style={{ marginLeft: '30px', cursor: 'pointer' }}>Cancel</button>
              </Dialog.Close>
              <Form.Submit asChild >
                <button className='Button green' style={{ marginLeft: '30px', cursor: 'pointer' }}>Add Node</button>
              </Form.Submit>
            </Flex>
          </Form.Root>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default NodeDialog;