import React, { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import { Button, useToast } from '@chakra-ui/react';
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi';
import { contractConfig } from '../config/contractConfig';

const JoinButton = () => {
  const { isDisconnected } = useAccount();
  const toast = useToast();
  const [gameId, setGameId] = useState<BigNumber>(BigNumber.from(0));

  const { config, error, refetch } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'getGame',
    args: [gameId.toString()],
    enabled: false
  });

  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash
  });

  const join = async () => {
    console.log('Joining game: ', gameId.toString());
    await refetch();
    write?.();
  };

  useEffect(() => {
    if (isSuccess) toast({ status: 'success', title: 'Game joined successfully!' });
  }, [isSuccess]);

  return (
    <>
      <Button
        isDisabled={isDisconnected || !write || isLoading}
        isLoading={isLoading}
        loadingText="Joining"
        onClick={() => join()}
      >
        Join
      </Button>
      <div>{error?.message}</div>
    </>
  );
};

export default JoinButton;
