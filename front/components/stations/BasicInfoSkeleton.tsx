import {
  Button,
  Flex,
  Grid,
  Select,
  Skeleton,
  Stat,
  StatGroup,
  StatLabel,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { RxCaretLeft } from 'react-icons/rx';
import { Header, Layout } from '../../components';

export default function BasicInfoSkeleton(): ReactElement {
  const router = useRouter();

  return (
    <>
      <Header title={`Single Station - Loading...`} />
      <Layout>
        <Flex justifyContent="space-between" my={4}>
          <Button onClick={() => router.back()}>
            <RxCaretLeft />
          </Button>
          <Flex alignItems="center" gap={2}>
            <Text>Apply calculation by</Text>
            <Select w="fit-content">
              <option value={5}>May</option>
              <option value={6}>June</option>
              <option value={7}>July</option>
            </Select>
          </Flex>
        </Flex>
        <Grid templateColumns="repeat(2, 1fr)">
          <Flex flexDirection="column" gap={1}>
            <Skeleton h="30px" w="260px" mb={4} />
            <Flex alignItems="center" gap={2}>
              <strong>Address:</strong> <Skeleton h="18px" w="100px" />
            </Flex>
            <Flex alignItems="center" gap={2}>
              <strong>Capacities:</strong> <Skeleton h="18px" w="100px" />
            </Flex>
            <p>
              <strong>Average distance:</strong>
            </p>
            <StatGroup mt={4}>
              <Stat>
                <StatLabel>Starting from this station:</StatLabel>
                <Skeleton h="30px" w="200px" />
              </Stat>
              <Stat>
                <StatLabel>Ending at this station:</StatLabel>
                <Skeleton h="30px" w="200px" />
              </Stat>
            </StatGroup>
          </Flex>
          <Flex justifyContent="flex-end">
            <Skeleton w="700px" h="400px" />
          </Flex>
        </Grid>
      </Layout>
    </>
  );
}
