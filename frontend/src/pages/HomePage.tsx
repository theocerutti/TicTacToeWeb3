import React from "react";
import { Box, Container, Text } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <Box m={4}>
      <Text fontSize='4xl' fontWeight='bold'>Your games</Text>
      <Text fontSize='xl'>Your turn</Text>
      <Text fontSize='xl'>Finished games</Text>
    </Box>
  );
};

export default HomePage;
