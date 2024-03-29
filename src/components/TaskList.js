import {
  VStack,
  StackDivider,
  HStack,
  Text,
  Image,
  Box,
  Skeleton,
  Checkbox,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { firestore, auth } from '../firebase/firebase';
import DeleteTask from './DeleteTask';
import ClearTasks from './ClearTasks';
import img from '../images/empty.svg';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser; // Get the currently logged-in user

  useEffect(() => {
    const unsubscribe = firestore
      .collection('users')
      .doc(user.uid)
      .collection('tasks')
      .orderBy('created_at', 'desc')
      .onSnapshot((snapshot) => {
        const tasksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(tasksData);
        setLoading(false);
      });

    return () => unsubscribe();
  }, [user.uid]);

  const handleTaskStatusChange = async (taskId, status) => {
    try {
      await firestore
        .collection('users')
        .doc(user.uid)
        .collection('tasks')
        .doc(taskId)
        .update({
          status: status,
        });
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  if (loading) {
    return (
      <Skeleton
        width={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '30vw' }}
        height="300px"
        rounded="md"
      />
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <Box align="center">
        <Image src={img} mt="30px" maxW="95%" />
      </Box>
    );
  }

  return (
    <>
      <VStack
        divider={<StackDivider />}
        borderColor="gray.100"
        borderWidth="2px"
        p="5"
        borderRadius="lg"
        w="100%"
        maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '30vw' }}
        alignItems="stretch"
      >
        {tasks.map((task) => (
          <HStack key={task.id}>
            <Checkbox
              size='lg'
              isChecked={task.status === 'complete'}
              onChange={(e) =>
                handleTaskStatusChange(
                  task.id,
                  e.target.checked ? 'complete' : 'incomplete'
                )
              }
            />
            <Text marginLeft='5px' flex="1" textDecoration={task.status === 'complete' ? 'line-through' : 'none'}>
              {task.text}
            </Text>
            <DeleteTask id={task.id} />
          </HStack>
        ))}
      </VStack>

      <ClearTasks />
    </>
  );
}