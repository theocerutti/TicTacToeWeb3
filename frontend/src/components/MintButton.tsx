import React, { useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi';
import { contractConfig } from '../config/contractConfig';
import { useToast } from '@chakra-ui/react';

const MintButton = () => {
  const toast = useToast();
  const { isDisconnected } = useAccount();

  const { config, error, refetch } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'mintGame',
    enabled: false
  });

  const { data, write: mint } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash
  });

  const mintGame = async () => {
    console.log('Try to mint new game...');
    await refetch();
    mint?.();
  };

  useEffect(() => {
    if (isSuccess) toast({ status: 'success', title: 'Game created successfully!' });
  }, [isSuccess, toast]);

  return (
    <>
      <Button
        colorScheme="blue"
        isDisabled={isDisconnected || !mint || isLoading}
        isLoading={isLoading}
        loadingText="Creating"
        onClick={mintGame}
      >
        Create
      </Button>
      <div>{error?.message}</div>
    </>
  );
};

export default MintButton;
