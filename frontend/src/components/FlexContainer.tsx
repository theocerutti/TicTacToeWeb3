import React from "react";
import {Flex} from "@chakra-ui/react";

const FlexContainer = ({ children, ...props }: { children: React.ReactNode }) => {
  return (
    <Flex flexDirection='column' justifyContent='center' flexGrow={1}>
      {children}
    </Flex>
  );
};

export default FlexContainer;