import React, { useEffect } from "react";
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Center, SimpleGrid, Spinner, Text, useToast } from "@chakra-ui/react";
import { useContractRead } from "wagmi";
import { contractConfig } from "../config/contractConfig";
import type { Game } from "../types";
import GamePreview from "../components/GamePreview";

const ExplorerPage = () => {
  const toast = useToast();
  // @ts-ignore
  const { data, isError, isLoading } = useContractRead({
    ...contractConfig,
    functionName: "getGames"
  });
  const games = data as Game[];

  useEffect(() => {
    if (isError)
      toast({ status: "error", title: "Error while fetching games" });
  }, [isError, toast]);

  return (
    <>
      <Text ml={20} fontWeight='bold' fontSize="4xl">Game Explorer</Text>
      <Box mx={20}>
        {isLoading && <Center><Spinner /></Center>}
        {games && games.length === 0 && (
          <Alert status="warning">
            <AlertIcon />
            <AlertTitle>No games!</AlertTitle>
            <AlertDescription>There is no game running, be the first to create a game!</AlertDescription>
          </Alert>
        )}
        {games && games.length > 0 && (
          <SimpleGrid columns={4} spacing={10}>
            {games.map((game) => <GamePreview key={game.id.toString()} game={game} />)}
          </SimpleGrid>
        )}
      </Box>
    </>
  );
};

export default ExplorerPage;
