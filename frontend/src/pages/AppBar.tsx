import {ConnectButton} from "@rainbow-me/rainbowkit";
import React from "react";
import {Button, HStack} from "@chakra-ui/react";

const AppBar = () => {
  return (
    <HStack justifyContent={"space-between"} m={4}>
      <HStack>
        <Button>Join</Button>
        <Button>Create</Button>
      </HStack>
      <ConnectButton/>
    </HStack>
  );
};

export default AppBar;