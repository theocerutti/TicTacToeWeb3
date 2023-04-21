import React from 'react';
import { useParams } from 'react-router-dom';
import TicTacToe from '../components/TicTacToe';
import FlexContainer from '../components/FlexContainer';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Center, Container, Spinner, useToast } from '@chakra-ui/react';
import { useAccount, useContractRead } from 'wagmi';
import { contractConfig } from '../config/contractConfig';
import { Game, GameState } from '../types';
import { ethers } from 'ethers';

const GamePage = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const toast = useToast();
  const { address: myAddress } = useAccount();
  const { data, refetch, isLoading } = useContractRead({
    ...contractConfig,
    functionName: 'getGame',
    args: [gameId],
    onError: (error) => {
      toast({ status: 'error', title: `Error while fetching game: #${gameId}.` });
      console.error(error);
    }
  });
  const game = data as Game | undefined;

  const page = () => {
    if (!game) {
      return (
        <Alert>
          <AlertIcon />
          <AlertTitle>Game not found!</AlertTitle>
        </Alert>
      );
    }
    if (game.opponent !== myAddress && game.owner !== myAddress) {
      return (
        <Alert>
          <AlertIcon />
          <AlertTitle>Game is not yours!</AlertTitle>
        </Alert>
      );
    }
    if (game.opponent === ethers.constants.AddressZero && game.owner === ethers.constants.AddressZero) {
      return (
        <Alert>
          <AlertIcon />
          <AlertTitle>Game is not complete!</AlertTitle>
        </Alert>
      );
    }
    if (game.gameState === GameState.HasWinner || game.gameState === GameState.Draw) {
      let description = '';

      if (game.gameState === GameState.Draw)
        description = 'Draw';
      if (game.gameState === GameState.HasWinner)
        description = game.winner === myAddress ? 'You' : 'Opponent';

      return (
        <Alert>
          <AlertIcon />
          <AlertTitle>Game is finished!</AlertTitle>
          <AlertDescription>
            {game.gameState === GameState.Draw ? description : `${description} won!`}
          </AlertDescription>
        </Alert>
      );
    }
    if (isLoading) {
      return (
        <Center>
          <Spinner />
        </Center>
      );
    }
    return <TicTacToe refetchGame={refetch} game={game} />;
  };

  return (
    <FlexContainer>
      <Container width={'50%'}>
        {page()}
      </Container>
    </FlexContainer>
  );
};

export default GamePage;
