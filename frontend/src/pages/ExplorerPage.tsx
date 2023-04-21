import React from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  HStack,
  SimpleGrid,
  Spinner,
  Text,
  useToast
} from '@chakra-ui/react';
import { useContractRead } from 'wagmi';
import { contractConfig } from '../config/contractConfig';
import type { Game } from '../types';
import GamePreview from '../components/GamePreview';
import { GiClockwiseRotation } from 'react-icons/gi';

const ExplorerPage = () => {
  const toast = useToast();
  const { data, isLoading, refetch } = useContractRead({
    ...contractConfig,
    functionName: 'getGames',
    onError: (error) => {
      toast({ status: 'error', title: 'Error while fetching games.' });
      console.error(error);
    }
  });
  const games = data as Game[];

  return (
    <Box mx={20}>
      <HStack justifyContent='space-between'>
        <Text mb={10} fontWeight='bold' fontSize='4xl'>
          Game Explorer
        </Text>
        <Button leftIcon={<GiClockwiseRotation />} onClick={async () => await refetch()}>Reload</Button>
      </HStack>
      <Box>
        {isLoading && (
          <Center>
            <Spinner />
          </Center>
        )}
        {games && games.length === 0 && (
          <Alert status='warning'>
            <AlertIcon />
            <AlertTitle>No games!</AlertTitle>
            <AlertDescription>
              There is no game running, be the first to create a game!
            </AlertDescription>
          </Alert>
        )}
        {games && games.length > 0 && (
          <SimpleGrid columns={4} spacing={10}>
            {games.map((game) => (
              <GamePreview key={game.id.toString()} game={game} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
};

export default ExplorerPage;
