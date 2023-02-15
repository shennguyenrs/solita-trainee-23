import type { ReactElement } from 'react';
import NextLink from 'next/link';
import { Link, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function NavLinks(): ReactElement {
  const router = useRouter();
  const path = router.pathname;

  return (
    <Flex gap={4}>
      <Link
        as={NextLink}
        href="/"
        color={path === '/' ? 'teal.500' : 'gray.500'}
        fontWeight={path === '/' ? 'bold' : ''}
      >
        Home
      </Link>
      <Link
        as={NextLink}
        href="/journies"
        rel="preload"
        color={path === '/journies' ? 'teal.500' : 'gray.500'}
        fontWeight={path === '/journies' ? 'bold' : ''}
      >
        Journies
      </Link>
      <Link
        as={NextLink}
        href="/stations"
        rel="preload"
        color={path === '/stations' ? 'teal.500' : 'gray.500'}
        fontWeight={path === '/stations' ? 'bold' : ''}
      >
        Stations
      </Link>
    </Flex>
  );
}
