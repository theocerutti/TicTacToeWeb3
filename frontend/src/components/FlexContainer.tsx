import React from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';

const FlexContainer = ({ children, ...props }: { children: React.ReactNode } & FlexProps) => {
  return (
    <Flex flexDirection="column" justifyContent="center" flexGrow={1} {...props}>
      {children}
    </Flex>
  );
};

export default FlexContainer;
