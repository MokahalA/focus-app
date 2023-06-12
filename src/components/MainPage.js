import React, { useState } from 'react';
import { Box, Flex, Heading, VStack, Text } from '@chakra-ui/react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import SignOut from './SignOut';
import UserBadge from './UserBadge';

function MainPage() {
  const [selectedList] = useState('Task List');

  // Get the current date
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  /*
  const handleListClick = (list) => {
    setSelectedList(list);
  };
  */

  return (
    <Flex direction="column" p={3} minH="100vh">
      <Flex justify="space-between" align="flex-start">
        <Box>
          <Box position="sticky" top="0" marginBottom="120px">
            <UserBadge />
            <Text fontSize="sm" color="#605e5c" fontWeight="200" padding="3">
              {currentDate}
            </Text>
            {/* 
            <Box marginTop="40px">
              <ListSelector onSelectList={handleListClick} />
            </Box>
            */}
          </Box>
        </Box>
        <Flex flex="1" align="center" justify="center">
          <VStack spacing="4" w="100%" maxW="500px">
            <Box marginTop="80px" marginRight="50px">
              <Box
                w="100%"
                display="flex"
                justifyContent="center"
                p="3"
                bgGradient="linear(to-l, teal.300, blue.500)"
                bgClip="text"
              >
                <Heading textAlign="center" fontWeight="extrabold" size="xl">
                  {selectedList}
                </Heading>
              </Box>
              <AddTask />
              <TaskList />
            </Box>
          </VStack>
        </Flex>
        <Box position="sticky" top="0" marginLeft="auto">
          <Box marginBottom="380px" marginRight="15px">
            <SignOut />
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default MainPage;