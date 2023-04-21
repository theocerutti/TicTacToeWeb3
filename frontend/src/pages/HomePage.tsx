import React from 'react';
import { Text, VStack } from '@chakra-ui/react';
import FlexContainer from '../components/FlexContainer';

const HomePage = () => {
  return (
    <FlexContainer>
      <VStack>
        <Text fontSize='4xl'>TicTacToe</Text>
        <Text fontSize='xl'>Let's create a new game and play with your friend!</Text>
      </VStack>
    </FlexContainer>
  );
};

export default HomePage;
