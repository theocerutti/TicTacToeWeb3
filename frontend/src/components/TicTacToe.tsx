import React from "react";
import {Box, Container, SimpleGrid} from "@chakra-ui/react";
import {useContract} from "wagmi";
import {BigNumber} from "ethers";

const TicTacToe = ({ gameId }: { gameId: BigNumber }) => {
  const boardSize = 3;
  const contract = useContract({
    address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    abi: ensRegistryABI,
    signerOrProvider: provider,
  });

  const { data, isError, isLoading } = useContractRead({
    address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
    abi: wagmigotchiABI,
    functionName: 'getGame',
  })

  const getBoardInfo = async () => {

  }

  const play = (position) => {

  }

  return (
    <Container width={"50%"}>
      <SimpleGrid columns={boardSize} spacingX="40px" spacingY="20px">
        {Array.from(Array(boardSize * boardSize).keys()).map((i) => (
          <Box key={i} bg="tomato" height="80px"></Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default TicTacToe;