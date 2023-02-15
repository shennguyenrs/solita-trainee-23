import type { ReactElement } from 'react';
import { Box, Heading, Flex, Spacer } from '@chakra-ui/react';
import NavLinks from './NavLinks';

export default function Layout({
  children,
}: {
  children?: ReactElement | ReactElement[];
}): ReactElement {
  return (
    <Box p={4}>
      <Flex flexDirection="row" alignItems="center">
        <Heading size="md" color="teal.500">
          My Solution
        </Heading>
        <Spacer />
        <NavLinks />
      </Flex>
      <Box mt={4}>{children}</Box>
    </Box>
  );
}
