import React from 'react';
import { Box, Flex, Heading, VStack } from '@chakra-ui/react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import SignOut from './SignOut';
import UserBadge from './UserBadge';


function MainPage() {
  return (
    <>
      <VStack p={4} minH="100vh">
        <Flex justify="space-between" align="center" w="100%">
          <Box>
            <UserBadge />

          </Box>
          <Box>
            <SignOut />
          </Box>
        </Flex>
        <Box
          w="100%"
          display="flex"
          justifyContent="center"
          mt="20"
          p="5"
          bgGradient="linear(to-l, teal.300, blue.500)"
          bgClip="text"
        >
          <Heading textAlign="center" fontWeight="extrabold" size="xl">
            Task List
          </Heading>
        </Box>
        <AddTask />
        <TaskList />
      </VStack>
    </>
  );
}

export default MainPage;