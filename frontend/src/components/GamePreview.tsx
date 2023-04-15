import React from "react";
import type { Game } from "../types";
import { Text, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Stack } from "@chakra-ui/react";
import { useAccount } from "wagmi";

const GamePreview = ({ game }: { game: Game }) => {
  return (
    <Card>
      <CardBody>
        <Stack mt='6' spacing='3'>
          <Heading size='md'>Game #{game.id.toString()}</Heading>
          <Text>Owner: </Text>
          <Text color='blue.600' fontSize='2xl'>
            $450
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing='2'>
          <Button variant='solid' colorScheme='blue'>
            Buy now
          </Button>
          <Button variant='ghost' colorScheme='blue'>
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default GamePreview;
