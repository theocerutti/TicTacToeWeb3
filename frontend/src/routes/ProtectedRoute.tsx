import React from 'react';
import { useAccount } from 'wagmi';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isDisconnected } = useAccount();

  if (isDisconnected) {
    return <Navigate to="/" replace state={{ accessingConnectMandatoryRoute: true }} />;
  }

  return children;
};

export default ProtectedRoute;
