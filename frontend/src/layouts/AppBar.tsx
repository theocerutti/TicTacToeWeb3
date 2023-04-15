import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { Center, Divider, HStack, Image, Spacer } from "@chakra-ui/react";
import MintButton from "../components/MintButton";
import JoinButton from "../components/JoinButton";

const AppBar = () => {
  return (
    <HStack justifyContent={"space-between"} m={4}>
      <HStack>
        <Image height={50} width={50} src={process.env.PUBLIC_URL + '/assets/logo.png'}/>
        <Center height='50px'>
          <Divider mx={5} orientation='vertical' />
        </Center>
        <MintButton />
        <JoinButton />
      </HStack>
      <ConnectButton />
    </HStack>
  );
};

export default AppBar;
