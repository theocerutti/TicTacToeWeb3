import React, { useState } from 'react';
import { Box, Center, SimpleGrid, Spinner, Tag, Text, VStack } from '@chakra-ui/react';
import { Game, SquareType } from '../types';
import { useAccount } from 'wagmi';
import useCustomWrite from '../hooks/useCustomWrite';
import { ethers } from 'ethers';

const TicTacToe = ({ game, refetchGame }: { game: Game, refetchGame: any } & React.ComponentPropsWithoutRef<'div'>) => {
  const [position, setPosition] = useState<number>(0);
  const { address: myAddress } = useAccount();
  const { refetch, isLoading, write: playCall } = useCustomWrite({
    args: [game.id.toString(), position],
    functionName: 'play',
    enabled: false,
    onSuccessWaitTransaction: async (defaultBehavior) => {
      defaultBehavior();
      await refetchGame();
    }
  });

  const play = async (position: number) => {
    setPosition(position);
    await refetch();
    playCall?.();
  };

  const getColorSquare = (value: SquareType) => {
    if (value === SquareType.SQUARE_NONE)
      return 'gray.100';
    else {
      if (value === SquareType.SQUARE_OWNER)
        return game.owner === myAddress ? 'blue.100' : 'red.100';
      if (value === SquareType.SQUARE_OPPONENT)
        return game.owner === myAddress ? 'red.100' : 'blue.100';
    }
  };

  const turnText = () => {
    if (game.opponent === ethers.constants.AddressZero) {
      return (
        <VStack>
          <Text fontSize='xl'>You can't play if you don't have opponent!</Text>
          <Text fontSize='xl'>Wait for a player to join...</Text>
        </VStack>
      );
    } else {
      return <Text fontSize='xl'>Its {game.isOwnerTurn && game.owner !== myAddress && 'NOT'} your turn</Text>;
    }
  };

  if (isLoading)
    return <Center><Spinner /></Center>;

  return (
    <>
      <Center mb={5}>
        {turnText()}
      </Center>
      <SimpleGrid columns={Math.sqrt(game.board.length)} spacingX='40px' spacingY='20px'>
        {Array.from(Array(game.board.length).keys()).map((i) => (
          <Box style={{ cursor: 'pointer' }} onClick={() => play(i)} key={i} bg={getColorSquare(game.board[i])}
               height='80px'></Box>
        ))}
      </SimpleGrid>
      <VStack>
        <Text mt={10} fontSize='xl' fontWeight='bold'>Information:</Text>
        <Text>Game #{game.id.toString()}</Text>
        <Text>
          <Tag bg='blue.100'>Owner</Tag>: {game.owner}
        </Text>
        <Text>
          <Tag bg='red.100' style={{ color: 'blue.100' }}>Opponent</Tag>: {game.opponent}
        </Text>
      </VStack>
    </>
  );
};

export default TicTacToe;
