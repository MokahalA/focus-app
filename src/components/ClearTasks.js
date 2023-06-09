import React from 'react';
import {
  Flex,
  Button,
  useToast,
  AlertDialog,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogCloseButton,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { firestore, auth } from '../firebase/firebase';

export default function ClearTasks() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const user = auth.currentUser; // Get the currently logged-in user

  async function handleDelete() {
    setLoading(true);

    try {
      // Get a reference to the user's tasks collection
      const tasksCollectionRef = firestore
        .collection('users')
        .doc(user.uid)
        .collection('tasks');

      // Delete all tasks in the collection
      const batch = firestore.batch();
      const snapshot = await tasksCollectionRef.get();
      snapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();

      // Close dialog
      onClose();

      // Show success toast
      toast({
        title: 'Tasks cleared!',
        position: 'top',
        status: 'warning',
        duration: 1000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error clearing tasks:', error);
      toast({
        title: 'An error occurred',
        description: 'Failed to clear tasks',
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
    <Flex>
      <Button
        colorScheme="gray"
        px="8"
        h="45"
        color="gray.500"
        mt="10"
        onClick={onOpen}
        isLoading={loading}
        loadingText="Clearing tasks"
      >
        Clear Tasks
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete all tasks?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={handleDelete}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Flex>
  );
}