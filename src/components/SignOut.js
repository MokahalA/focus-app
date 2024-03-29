import React from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { auth } from '../firebase/firebase';

function SignOut() {
  const toast = useToast();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        toast({
          title: 'Signed out.',
          description: 'You have been successfully signed out.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error('Error signing out:', error);
        toast({
          title: 'An error occurred',
          description: 'Failed to sign out',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    auth.currentUser && (
      <Button
        colorScheme="teal"
        variant="solid"
        px="8"
        h="45"
        mt="2"
        size="sm"
        fontSize="15px"
        onClick={handleSignOut}
      >
        Sign Out
      </Button>
    )
  );
}

export default SignOut;