import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';
import { Box, Button, Center, Divider, HStack, Image } from '@chakra-ui/react';
import MintButton from '../components/MintButton';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';

const AppBar = () => {
  const navigate = useNavigate();
  const { isDisconnected } = useAccount();

  return (
    <HStack justifyContent={'space-between'} m={4}>
      <HStack>
        <Box style={{ cursor: 'pointer' }} onClick={() => navigate('/')} height={50} width={50}>
          <Image onClick={() => navigate('/')} src={process.env.PUBLIC_URL + '/assets/logo.png'} />
        </Box>
        <Center height="50px">
          <Divider mx={5} orientation="vertical" />
        </Center>
        <MintButton />
        <Button isDisabled={isDisconnected} onClick={() => navigate('/explore')}>Explore</Button>
      </HStack>
      <ConnectButton />
    </HStack>
  );
};

export default AppBar;
