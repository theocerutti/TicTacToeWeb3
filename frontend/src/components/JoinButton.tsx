import React from 'react';
import { ethers } from 'ethers';
import { Button, ButtonProps, useToast } from '@chakra-ui/react';
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { contractConfig } from '../config/contractConfig';
import { useNavigate } from 'react-router-dom';

const JoinButton = ({ gameId, alreadyInGame, ...props }: {
  alreadyInGame?: boolean,
  gameId: ethers.BigNumber
} & ButtonProps) => {
  const { isDisconnected } = useAccount();
  const navigate = useNavigate();
  const toast = useToast();

  const { config, refetch } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'join',
    args: [gameId.toString()],
    onSuccess: () => {
      // TODO: show spinner until transaction is mined
    },
    onError: (error) => {
      toast({ status: 'error', title: 'Error while joining game.' });
      console.error(error);
    },
    enabled: false
  });

  const { data, write } = useContractWrite(config);

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onError: (error) => {
      toast({ status: 'error', title: 'Error while joining game.' });
      console.error(error);
    },
    onSuccess: () => {
      toast({ status: 'success', title: 'Joined game successfully!' });
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
      isDisabled={isDisconnected || !write || isLoading}
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
