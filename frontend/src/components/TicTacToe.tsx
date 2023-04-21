import React, { useState } from 'react';
import { Box, Center, SimpleGrid, Spinner, Tag, Text, useToast, VStack } from '@chakra-ui/react';
import { Game, SquareType } from '../types';
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { contractConfig } from '../config/contractConfig';

const TicTacToe = ({ game, refetchGame }: { game: Game, refetchGame: any } & React.ComponentPropsWithoutRef<'div'>) => {
  const [position, setPosition] = useState<number>(0);
  const { address: myAddress } = useAccount();
  const toast = useToast();
  const { config, refetch } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'play',
    args: [game.id.toString(), position],
    onSuccess: () => {
      // TODO: show spinner until transaction is mined
    },
    onError: (error) => {
      // @ts-ignore
      toast({ status: 'error', title: `Error while playing game: ${error?.reason}` });
      console.error(error);
    },
    enabled: false
  });

  const { data, write: playCall } = useContractWrite(config);

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onError: (error) => {
      toast({ status: 'error', title: `Error while playing game: ${error.message}` });
      console.error(error);
    },
    onSuccess: async () => {
      toast({ status: 'success', title: 'Play game successfully!' });
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

  if (isLoading)
    return <Center><Spinner /></Center>;

  return (
    <>
      <Center mb={5}>
        <Text fontSize='xl'>Its {game.isOwnerTurn && game.owner !== myAddress && 'NOT'} your turn</Text>
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
