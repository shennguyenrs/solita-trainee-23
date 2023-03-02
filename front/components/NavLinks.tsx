import type { ReactElement } from 'react';
import NextLink from 'next/link';
import { Link, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const regHome = /^\/$/;
const regJournies = /^\/journies.*$/;
const regStations = /^\/stations.*$/;

export default function NavLinks(): ReactElement {
  const router = useRouter();
  const path = router.pathname;
  const isAtHome = regHome.test(path);
  const isAtJournies = regJournies.test(path);
  const isAtStations = regStations.test(path);

  return (
    <Flex gap={4}>
      <Link
        as={NextLink}
        href="/"
        color={isAtHome ? 'teal.500' : 'gray.500'}
        fontWeight={isAtHome ? 'bold' : ''}
      >
        Home
      </Link>
      <Link
        as={NextLink}
        href="/journies/all"
        rel="preload"
        color={isAtJournies ? 'teal.500' : 'gray.500'}
        fontWeight={isAtJournies ? 'bold' : ''}
      >
        Journies
      </Link>
      <Link
        as={NextLink}
        href="/stations"
        rel="preload"
        color={isAtStations ? 'teal.500' : 'gray.500'}
        fontWeight={isAtStations ? 'bold' : ''}
      >
        Stations
      </Link>
    </Flex>
  );
}
