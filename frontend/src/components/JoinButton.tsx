import React from 'react';
import { ethers } from 'ethers';
import { Button, ButtonProps } from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import useCustomContractWrite from '../hooks/useCustomWrite';

const JoinButton = ({ gameId, alreadyInGame, ...props }: {
  alreadyInGame?: boolean,
  gameId: ethers.BigNumber
} & ButtonProps) => {
  const { isDisconnected } = useAccount();
  const navigate = useNavigate();
  const { write, refetch, isLoading } = useCustomContractWrite({
    args: [gameId.toString()],
    functionName: 'join',
    enabled: false,
    onSuccessWaitTransaction: (defaultBehavior) => {
      defaultBehavior();
      goToGame();
    }
  });

  const goToGame = () => navigate('/game/' + gameId.toString());

  const join = async () => {
    console.log('Joining game: ', gameId.toString());
    if (alreadyInGame) {
      return goToGame();
    }
    await refetch();
    write?.();
  };

  return (
    <Button
      variant='solid'
      colorScheme='blue'
      isDisabled={isDisconnected || props.isDisabled}
      isLoading={isLoading}
      loadingText='Joining...'
      onClick={() => join()}
      {...props}
    >
      {alreadyInGame ? 'Play' : 'Join'}
    </Button>
  );
};

export default JoinButton;
