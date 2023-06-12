import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Input,
  VStack,
  StackDivider,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { firestore, auth } from '../firebase/firebase';


function ListSelector() {

  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState('');
  const [selectedList, setSelectedList] = useState('');

  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const listsRef = firestore
        .collection('users')
        .doc(user.uid)
        .collection('lists');
      const unsubscribe = listsRef.onSnapshot((snapshot) => {
        const listsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLists(listsData);

        // Check if "My List" exists
        const myList = listsData.find((list) => list.name === 'My List');

        // If "My List" doesn't exist, create it
        if (!myList) {
          listsRef.add({ name: 'My List' });
        } else {
          setSelectedList(myList.id); // Set "My List" as selected list
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  const handleAddList = () => {
    if (newListName.trim() !== '') {
      const listsRef = firestore.collection('users').doc(user.uid).collection('lists');
      listsRef.add({ name: newListName });
      setNewListName('');
    }
  };

  const handleListClick = (list) => {
    setSelectedList(list.id);
  };

  const handleDeleteList = (list) => {
    const listRef = firestore
      .collection('users')
      .doc(user.uid)
      .collection('lists')
      .doc(list.id);
    listRef.delete();
  };

  const isListSelectorVisible = useBreakpointValue({ base: false, md: true });

  return (
    <Box
      w="250px"
      bg="gray.200"
      p="4"
      border="1px"
      borderStyle="groove"
      rounded="md"
      display={isListSelectorVisible ? 'block' : 'none'}
    >
      <VStack spacing="2" alignItems="stretch" divider={<StackDivider />}>
        {lists.map((list) => (
          <Flex
            key={list.id}
            align="center"
            cursor="pointer"
            _hover={{ textDecoration: 'underline' }}
            onClick={() => handleListClick(list)}
          >
            <Text
              fontSize="sm"
              fontWeight={selectedList === list.id ? 'bold' : 'normal'}
              flexGrow="1"
            >
              {list.name}
            </Text>
            <Button
              size="xs"
              colorScheme="red"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteList(list);
              }}
              variant="ghost"
              marginLeft="2"
            >
              <DeleteIcon />
            </Button>
          </Flex>
        ))}
        <Flex align="center">
          <Input
            placeholder="Add a new list"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            flexGrow="1"
          />
          <Button
            colorScheme="teal"
            size="sm"
            onClick={handleAddList}
            marginLeft="2"
            borderRadius="full"
          >
            <AddIcon boxSize={3} />
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
}

export default ListSelector;