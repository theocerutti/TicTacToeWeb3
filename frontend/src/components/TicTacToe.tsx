import React from "react";
import { Box, Center, Container, SimpleGrid, Text } from "@chakra-ui/react";
import { BigNumber } from "ethers";

const TicTacToe = ({ gameId }: { gameId: BigNumber }) => {
  const boardSize = 3;

  // // @ts-ignore
  // const { data, isError, isLoading } = useContractRead({
  //   ...contractConfig,
  //   functionName: 'getGames',
  // });
  //
  // console.log(data, isError, isLoading);
  //
  // const getBoardInfo = () => {
  //   return null;
  // }
  //
  // const play = (position: number) => {
  // }

  return (
    <Container width={"50%"}>
      <SimpleGrid columns={boardSize} spacingX="40px" spacingY="20px">
        {Array.from(Array(boardSize * boardSize).keys()).map((i) => (
          <Box key={i} bg="tomato" height="80px"></Box>
        ))}
      </SimpleGrid>
      <Center>
        <Text mt={10}>Game #{gameId.toString()}</Text>
      </Center>
    </Container>
  );
};

export default TicTacToe;
