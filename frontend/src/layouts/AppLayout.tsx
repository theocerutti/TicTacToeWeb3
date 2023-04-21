import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { goerli, hardhat } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import AppBar from './AppBar';
import { Box, ChakraProvider } from '@chakra-ui/react';
import FlexContainer from '../components/FlexContainer';
import { Outlet } from 'react-router-dom';

const { chains, provider, webSocketProvider } = configureChains(
  [
    goerli,
    ...(process.env.REACT_APP_ENV === 'development' ? [hardhat] : [])
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'TicTacToe',
  projectId: 'YOUR_PROJECT_ID',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider
});

const AppLayout = () => {
  return (
    <FlexContainer>
      <ChakraProvider toastOptions={{ defaultOptions: { position: 'bottom-right' } }}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider modalSize={'compact'} chains={chains}>
            <AppBar />
            <Box display='flex' flexDirection='column' flex={1} m={4}>
              <Outlet />
            </Box>
          </RainbowKitProvider>
        </WagmiConfig>
      </ChakraProvider>
    </FlexContainer>
  );
};

export default AppLayout;
