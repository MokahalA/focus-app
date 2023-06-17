import { Button, HStack, Input, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { firestore, auth } from '../firebase/firebase';

export default function AddTask() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const user = auth.currentUser; // Get the currently logged-in user

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // Add task to the user's tasks collection in Firestore
      await firestore.collection('users').doc(user.uid).collection('tasks').add({
        text: text,
        created_at: new Date().getTime(),
        status: 'incomplete', // Set the initial status as 'incomplete'
      });

      // Reset the input field
      setText('');

      toast({
        title: 'Task added!',
        position: 'top',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error adding task:', error);
      toast({
        title: 'An error occurred',
        description: 'Failed to add task',
        position: 'top',
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <HStack my="4" h="45">
        <Input
          h="100%"
          variant="filled"
          placeholder="Do the laundry"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={loading}
        />
        <Button
          colorScheme="blue"
          px="10"
          h="100%"
          type="submit"
          isLoading={loading}
          loadingText="Adding"
        >
          Add
        </Button>
      </HStack>
    </form>
  );
}