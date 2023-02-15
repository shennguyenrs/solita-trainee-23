import {
  Button,
  Flex,
  Grid,
  Heading,
  Select,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import { RxCaretLeft } from 'react-icons/rx';
import useSWR, { Fetcher } from 'swr';
import wretch from 'wretch';
import { Header, Layout, PaginationTable } from '../../components';
import { BasicInfoSkeleton } from '../../components/stations';
import { journiesFields } from '../../libs/constants';
import { reduceDecimal } from '../../utils';

const { publicRuntimeConfig } = getConfig();
const fetcher: Fetcher<any, string> = (s: string) => wretch(s).get().json();

const months =
  'January,Febuary,March,April,May,June,July,August,September,October,November,December'.split(
    ','
  );

export default function SingleStation(): ReactElement {
  const router = useRouter();
  const { id } = router.query;
  const [month, setMonth] = useState<number>(5);
  const { data, error, isLoading } = useSWR<any, Error>(
    publicRuntimeConfig.BASE_API + `/stations/${id}?month=${month}`,
    fetcher
  );

  if (error) {
    return (
      <>
        <Header title="Single Station - Error" />
        <Layout>
          <Flex justifyContent="space-between" my={4}>
            <Button onClick={() => router.back()}>
              <RxCaretLeft />
            </Button>
          </Flex>
          <Flex justifyContent="center" alignItems="center" h="60vh">
            <p>Something wrong happens! Please try again!</p>
          </Flex>
        </Layout>
      </>
    );
  }

  if (isLoading) {
    return <BasicInfoSkeleton />;
  }

  const { info, avgDistancesStartingFrom, avgDistancesEndingAt } = data;

  return (
    <>
      <Header title={`Single Station - ${info.name}, ${info.address}`} />
      <Layout>
        <Flex justifyContent="space-between" my={4}>
          <Button onClick={() => router.back()}>
            <RxCaretLeft />
          </Button>
          <Flex alignItems="center" gap={2}>
            <Text>Apply calculation by</Text>
            <Select
              w="fit-content"
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
            >
              <option value={5}>May</option>
              <option value={6}>June</option>
              <option value={7}>July</option>
            </Select>
          </Flex>
        </Flex>
        <Grid templateColumns="repeat(2, 1fr)">
          <Flex flexDirection="column" gap={1}>
            <Heading size="md" mb={4}>
              Information of{' '}
              <Text color="teal.500" as="u">
                {info.name}
              </Text>{' '}
              station by {months[month - 1]}
            </Heading>
            <p>
              <strong>Address:</strong> {info.address}
            </p>
            <p>
              <strong>Capacities:</strong> {info.capacities}
            </p>
            <p>
              <strong>Average distance:</strong>
            </p>
            <StatGroup mt={4}>
              <Stat>
                <StatLabel>Starting from this station:</StatLabel>
                <StatNumber>
                  {reduceDecimal(avgDistancesStartingFrom)}m
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Ending at this station:</StatLabel>
                <StatNumber>{reduceDecimal(avgDistancesEndingAt)}m</StatNumber>
              </Stat>
            </StatGroup>
          </Flex>
          <Flex justifyContent="flex-end">
            <iframe
              width="700"
              height="400"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=${publicRuntimeConfig.MAP_KEY}&q=${info.name}+stops&center=${info.y},${info.x}&zoom=15`}
              allowFullScreen
            />
          </Flex>
        </Grid>
        <Flex flexDirection="column" my={8}>
          <Heading size="sm">
            All journies that starting from this station in {months[month - 1]}
          </Heading>
          <PaginationTable
            queryURL={`/stations/${info.id}/journies/starting-from?month=${month}&`}
            tableFields={journiesFields}
          />
        </Flex>
        <Flex flexDirection="column" my={8}>
          <Heading size="sm">
            All journies that ending at this station in {months[month - 1]}
          </Heading>
          <PaginationTable
            queryURL={`/stations/${info.id}/journies/ending-at?month=${month}&`}
            tableFields={journiesFields}
          />
        </Flex>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id;

  if (!id) {
    return {
      redirect: {
        destination: '/stations',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
