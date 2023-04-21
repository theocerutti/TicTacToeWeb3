import React from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { contractConfig } from '../config/contractConfig';

const MintButton = () => {
  const toast = useToast();
  const { isDisconnected } = useAccount();

  const { config, refetch } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'mintGame',
    onSuccess: () => {
      // TODO: show spinner until transaction is mined
    },
    onError: (error) => {
      toast({ status: 'error', title: 'Error while creating game.' });
      console.error(error);
    },
    enabled: false
  });

  const { data, write: mint } = useContractWrite(config);

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      toast({ status: 'success', title: 'Game created successfully!' });
    },
    onError: (error) => {
      toast({ status: 'error', title: 'Error while creating game.' });
      console.error(error);
    },
  });

  const mintGame = async () => {
    console.log('Try to mint new game...');
    await refetch();
    mint?.();
  };

  return (
    <Button
      colorScheme='blue'
      isDisabled={isDisconnected || isLoading}
      isLoading={isLoading}
      loadingText='Creating'
      onClick={mintGame}
    >
      Create
    </Button>
  );
};

export default MintButton;
