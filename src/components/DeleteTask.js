import { IconButton, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { firestore, auth } from '../firebase/firebase';

export default function DeleteTask({ id }) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const user = auth.currentUser; // Get the currently logged-in user

  async function handleDelete() {
    setLoading(true);

    try {
      // Delete the task from the user's tasks collection in Firestore
      await firestore
        .collection('users')
        .doc(user.uid)
        .collection('tasks')
        .doc(id)
        .delete();

      toast({
        title: 'Task deleted!',
        position: 'top',
        status: 'warning',
        duration: 1000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting task:', error);
      toast({
        title: 'An error occurred',
        description: 'Failed to delete task',
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
    <IconButton
      isRound="true"
      icon={<FiTrash2 />}
      onClick={handleDelete}
      isLoading={loading}
    />
  );
}