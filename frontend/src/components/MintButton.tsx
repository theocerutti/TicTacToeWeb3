import React from 'react';
import { Button } from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import useCustomContractWrite from '../hooks/useCustomWrite';

const MintButton = () => {
  const { isDisconnected } = useAccount();
  const { write: mint, refetch, isLoading } = useCustomContractWrite({
    functionName: 'mintGame',
    enabled: false,
    waitTransactionSuccessMsg: 'Minted new game successfully!',
    waitTransactionErrorMsg: 'Error while minting new game.'
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
