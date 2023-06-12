import React, { useEffect, useState } from 'react';
import { Avatar, Box, Text, Flex, useBreakpointValue } from '@chakra-ui/react';
import { auth } from '../firebase/firebase';

function UserBadge() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const isUserBadgeVisible = useBreakpointValue({ base: false, md: true });

  if (!user || !isUserBadgeVisible) {
    return null; // Render nothing if there is no signed-in user or on small screens
  }

  return (
    <Flex mt="2" border="1px" borderStyle="groove" rounded="md" p="2">
      <Avatar src={user.photoURL} />
      <Box ml="3">
        <Text fontWeight="bold">{user.displayName}</Text>
        <Text fontSize="sm">{user.email}</Text>
      </Box>
    </Flex>
  );
}

export default UserBadge;