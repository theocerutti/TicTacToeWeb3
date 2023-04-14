import "@rainbow-me/rainbowkit/styles.css";
import {getDefaultWallets, RainbowKitProvider} from "@rainbow-me/rainbowkit";
import {configureChains, createClient, WagmiConfig} from "wagmi";
import {arbitrum, goerli, mainnet, optimism, polygon} from "wagmi/chains";
import {publicProvider} from "wagmi/providers/public";
import AppBar from "./pages/AppBar";
import {ChakraProvider} from "@chakra-ui/react";
import Home from "./pages/Home";
import FlexContainer from "./components/FlexContainer";

// @ts-ignore
const {chains, provider, webSocketProvider} = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [publicProvider()]
);

const {connectors} = getDefaultWallets({
  appName: "TicTacToe",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

// @ts-ignore
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const App = () => {
  // @ts-ignore
  return (
    <FlexContainer>
      <ChakraProvider>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider modalSize={"compact"} chains={chains}>
            <AppBar/>
            <FlexContainer>
              <Home/>
            </FlexContainer>
          </RainbowKitProvider>
        </WagmiConfig>
      </ChakraProvider>
    </FlexContainer>
  );
};

export default App;