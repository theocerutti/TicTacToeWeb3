import React, { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { Button, useToast } from "@chakra-ui/react";
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { contractConfig } from "../config/contractConfig";

const JoinButton = () => {
  const { isDisconnected } = useAccount();
  const toast = useToast();
  const [gameId, setGameId] = useState<BigNumber>(BigNumber.from(0));
  // @ts-ignore
  const { config, error, refetch } = usePrepareContractWrite({
    ...contractConfig,
    functionName: "getGame",
    args: [gameId.toString()],
    enabled: false
  });
  // @ts-ignore
  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash
  });

  const join = async () => {
    console.log("Joining game: ", gameId.toString());
    await refetch();
    write?.();
  };

  useEffect(() => {
    if (isSuccess)
      toast({ status: "success", title: "Game joined successfully!" });
  }, [isSuccess]);

  return (
    <>
      <Button disabled={isDisconnected || !write || isLoading} isLoading={isLoading} loadingText="Joining" onClick={() => join()}>
        Join
      </Button>
      <div>{
        /* @ts-ignore */
        error?.reason
      }
      </div>
    </>
  );
};

export default JoinButton;
