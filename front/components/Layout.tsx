import type { ReactElement } from 'react';
import { Box, Heading, Flex, Spacer, Spinner } from '@chakra-ui/react';
import NavLinks from './NavLinks';
import { useAtom } from 'jotai';
import { showLoadingAtom } from '../libs/atoms';

export default function Layout({
  children,
}: {
  children?: ReactElement | ReactElement[];
}): ReactElement {
  const [show] = useAtom(showLoadingAtom);

  return (
    <Box position="relative">
      {show ? (
        <Box
          w="99vw"
          h="100vh"
          bg="gray.100"
          position="absolute"
          top="0"
          left="0"
          zIndex="1"
          opacity="80%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner size="xl" color="teal.500" />
        </Box>
      ) : null}
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
    </Box>
  );
}
