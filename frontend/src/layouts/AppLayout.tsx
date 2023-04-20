import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { arbitrum, goerli, hardhat, mainnet, optimism, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import AppBar from './AppBar';
import { Box, ChakraProvider } from '@chakra-ui/react';
import FlexContainer from '../components/FlexContainer';
import { Outlet } from 'react-router-dom';

const { chains, provider, webSocketProvider } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    ...(process.env.REACT_APP_ENV === 'development' ? [goerli, hardhat] : [])
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
      <ChakraProvider>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider modalSize={'compact'} chains={chains}>
            <AppBar />
            <Box m={4}>
              <Outlet />
            </Box>
          </RainbowKitProvider>
        </WagmiConfig>
      </ChakraProvider>
    </FlexContainer>
  );
};

export default AppLayout;
