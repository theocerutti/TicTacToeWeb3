import React from 'react';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { contractConfig } from '../config/contractConfig';
import { ToastId, useToast } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';

type UseCustomContractWriteProps = {
  functionName: string;
  enabled?: boolean;
  args?: unknown[],
  scopeKey?: string;
  preparedErrorMsg?: string;
  preparedSuccessMsg?: string;
  callContractSuccessMsg?: string,
  callContractErrorMsg?: string,
  waitTransactionSuccessMsg?: string;
  waitTransactionErrorMsg?: string;
  onSuccessPrepared?: (defaultBehavior: () => void) => void;
  onErrorPrepared?: (error: Error, defaultBehavior: (error: Error) => void) => void;
  onSuccessCallContract?: (defaultBehavior: () => void) => void;
  onErrorCallContract?: (error: Error, defaultBehavior: (error: Error) => void) => void;
  onSuccessWaitTransaction?: (defaultBehavior: () => void) => void;
  onErrorWaitTransaction?: (error: Error, defaultBehavior: (error: Error) => void) => void;
};

const useCustomContractWrite = ({
  functionName,
  enabled = false,
  args = [],
  scopeKey,
  preparedErrorMsg = "Transaction didn't prepared successfully.",
  preparedSuccessMsg = "Transaction prepared successfully.",
  callContractSuccessMsg = "Transaction called successfully.",
  callContractErrorMsg = "Error while calling transaction.",
  waitTransactionSuccessMsg = 'Transaction mined successfully!',
  waitTransactionErrorMsg = 'Error while waiting for transaction.',
  onSuccessPrepared,
  onErrorPrepared,
  onSuccessCallContract,
  onErrorCallContract,
  onSuccessWaitTransaction,
  onErrorWaitTransaction,
}: UseCustomContractWriteProps) => {
  const toast = useToast();
  const toastIdRef = React.useRef<ToastId>();

  const defaultBehaviors = {
    onSuccessPrepared: () => {
      toast({ status: 'success', title: preparedSuccessMsg });
    },
    onErrorPrepared: (error: Error) => {
      toast({ status: 'error', title: preparedErrorMsg });
      console.error(error);
    },
    onSuccessCallContract: () => {
      toastIdRef.current = toast({
        status: 'success',
        title: callContractSuccessMsg,
        duration: null,
        icon: <Spinner/>,
      });
    },
    onErrorCallContract: (error: Error) => {
      toast({ status: 'error', title: callContractErrorMsg });
      console.error(error);
    },
    onSuccessWaitTransaction: () => {
      toast({ status: 'success', title: waitTransactionSuccessMsg });
      closeLoadingToast();
    },
    onErrorWaitTransaction: (error: Error) => {
      toast({ status: 'error', title: waitTransactionErrorMsg });
      closeLoadingToast();
      console.error(error);
    },
  }

  const closeLoadingToast = () => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
  }

  const prepared = usePrepareContractWrite({
    ...contractConfig,
    functionName,
    args,
    scopeKey,
    enabled,
    onSuccess: () => {
      if (onSuccessPrepared) {
        onSuccessPrepared(defaultBehaviors.onSuccessPrepared);
      } else {
        defaultBehaviors.onSuccessPrepared();
      }
    },
    onError: (error) => {
      if (onErrorPrepared) {
        onErrorPrepared(error, defaultBehaviors.onErrorPrepared);
      } else {
        defaultBehaviors.onErrorPrepared(error)
      }
    },
  });

  const contractWrite = useContractWrite({
    ...prepared.config,
    onSuccess: () => {
      if (onSuccessCallContract) {
        onSuccessCallContract(defaultBehaviors.onSuccessCallContract);
      } else {
        defaultBehaviors.onSuccessCallContract();
      }
    },
    onError: (error) => {
      if (onErrorCallContract) {
        onErrorCallContract(error, defaultBehaviors.onErrorCallContract);
      } else {
        defaultBehaviors.onErrorCallContract(error);
      }
    }
  });

  const waitForTransaction = useWaitForTransaction({
    hash: contractWrite.data?.hash,
    onSuccess: () => {
      if (onSuccessWaitTransaction) {
        onSuccessWaitTransaction(defaultBehaviors.onSuccessWaitTransaction);
      } else {
        defaultBehaviors.onSuccessWaitTransaction();
      }
    },
    onError: (error) => {
      if (onErrorWaitTransaction) {
        onErrorWaitTransaction(error, defaultBehaviors.onErrorWaitTransaction);
      } else {
        defaultBehaviors.onErrorWaitTransaction(error);
      }
    },
  });

  return {
    prepared,
    contractWrite,
    waitForTransaction,
    ...waitForTransaction,
    refetch: prepared.refetch,
    write: contractWrite.write,
  };
}

export default useCustomContractWrite;