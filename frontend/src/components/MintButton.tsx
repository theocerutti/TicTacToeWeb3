import React, { useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { contractConfig } from "../config/contractConfig";
import { useToast } from '@chakra-ui/react'

const MintButton = () => {
  const toast = useToast()
  // @ts-ignore
  const { config, error, refetch } = usePrepareContractWrite({
    ...contractConfig,
    functionName: "mintGame",
    enabled: false
  });
  // @ts-ignore
  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash
  });

  const mintGame = async () => {
    console.log("Try to mint new game...")
    await refetch();
    write?.();
  };

  useEffect(() => {
    if (isSuccess)
      toast({status: 'success', title: 'Game created successfully!'});
  }, [isSuccess]);

  return (
    <>
      <Button colorScheme='blue' disabled={!write || isLoading} isLoading={isLoading} loadingText='Creating' onClick={mintGame}>
        Create
      </Button>
      <div>{
        /* @ts-ignore */
        error?.reason
      }
      </div>
    </>
  );
};

export default MintButton;
