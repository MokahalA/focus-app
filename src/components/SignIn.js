import React from 'react';
import { Heading, Button, VStack, Center, Text, useToast, Box, Image } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { auth } from '../firebase/firebase';
import SignOut from './SignOut';

import productivity from '../images/productivity.jpg';

function SignIn() {
  const toast = useToast();

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth
      .signInWithPopup(provider)
      .then(() => {
        toast({
          title: 'Signed in.',
          description: 'Welcome to your productivity app.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error('Error signing in:', error);
        toast({
          title: 'An error occurred',
          description: 'Failed to sign in',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <VStack p={2} minH="100vh">
        <Heading
          mt="20"
          p="2"
          fontWeight="extrabold"
          size="xl"
          bgGradient="linear(to-r, #FF7E5F, #feb47b)"
          bgClip="text"
        >
          Focus App
          <SignOut />
        </Heading>
        <Center p={6} flexDirection="column">
          <Box align="center">
            <Image src={productivity} mt="30px" maxW="40%" />
          </Box>
          <Button
            w="full"
            maxW="sm"
            variant="outline"
            marginTop={5}
            onClick={signInWithGoogle}
            leftIcon={<FcGoogle />}
          >
            <Center>
              <Text>Sign in with Google</Text>
            </Center>
          </Button>
        </Center>
      </VStack>
    </>
  );
}

export default SignIn;