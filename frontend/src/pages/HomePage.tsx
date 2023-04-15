import React from "react";
import { Box, Text } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <Box ml={20}>
      <Text fontSize="4xl" fontWeight="bold">Your games</Text>
      <Text fontSize="xl">Your turn</Text>
      <Text fontSize="xl">Finished games</Text>
    </Box>
  );
};

export default HomePage;
