import React from 'react';
import type { Game } from '../types';
import { GameState } from '../types';
import {
  Box,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader, Flex,
  Heading,
  HStack,
  Stack,
  Text,
  Tooltip
} from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { truncateEthAddress } from '../utils/address';
import JoinButton from './JoinButton';
import { AiFillForward, AiFillTrophy, AiOutlineSwap } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';

const GamePreview = ({ game }: { game: Game }) => {
  const { address: myAddress } = useAccount();

  const showAddress = (address: string) => {
    if (address === ethers.constants.AddressZero)
      return 'None';
    return truncateEthAddress(address) + (address === myAddress ? ' (You)' : '');
  };

  const headerColor = () => {
    switch (game.gameState) {
      case GameState.OnGoing:
        return 'green.500';
      case GameState.Draw:
        return 'yellow.500';
      case GameState.HasWinner:
        return 'blue.500';
    }
  };

  const getGameStateIcon = () => {
    switch (game.gameState) {
      case GameState.OnGoing:
        return <AiFillForward />;
      case GameState.Draw:
        return <AiOutlineSwap />;
      case GameState.HasWinner:
        return <AiFillTrophy />;
    }
  };

  return (
    <Card variant='filled'>
      <CardHeader borderRadius={5} bgColor={headerColor()}>
        <Heading size='md'>
          <HStack justifyContent='space-between'>
            <Flex>
              {game.owner === myAddress && (
                <Box mr={2}>
                  <FaUserAlt/>
                </Box>
              )}
              <Box>
                Game #{game.id.toString()}
              </Box>
            </Flex>
            <Tooltip shouldWrapChildren label={GameState[game.gameState]} placement='top'>
              {getGameStateIcon()}
            </Tooltip>
          </HStack>
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack spacing='3'>
          <Text>
            <span style={{ fontWeight: 'bold' }}>Owner</span>: {showAddress(game.owner)}
          </Text>
          <Text>
            <span style={{ fontWeight: 'bold' }}>Opponent</span>: {showAddress(game.opponent)}
          </Text>
          {game.gameState === GameState.OnGoing &&
            <Text>
              <span style={{ fontWeight: 'bold' }}>Turn</span>: {game.isOwnerTurn ? 'Owner' : 'Opponent'}
            </Text>
          }
          <Text>
            <span style={{ fontWeight: 'bold' }}>State</span>: {GameState[game.gameState]}
          </Text>
          {game.winner !== ethers.constants.AddressZero &&
            <Text fontSize='sm'>
              <span style={{ fontWeight: 'bold' }}>Winner</span>: {showAddress(game.winner)}
            </Text>
          }
        </Stack>
      </CardBody>
      {game.gameState === GameState.OnGoing && (
        <CardFooter>
          <ButtonGroup spacing='2'>
            <JoinButton
              alreadyInGame={game.owner === myAddress || game.opponent === myAddress}
              isDisabled={game.owner === myAddress} gameId={game.id}
            />
          </ButtonGroup>
        </CardFooter>
      )}
    </Card>
  );
};

export default GamePreview;
