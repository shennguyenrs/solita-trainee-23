import { Box, Button, Flex, Spacer } from '@chakra-ui/react';
import type { ReactElement } from 'react';
import { Header, Layout } from '../../components';
import PaginationTable from '../../components/PaginationTable';
import { AddJourney, FilterJournies } from '../../components/journies';
import { journiesFields } from '../../libs/constants';
import { GetServerSideProps } from 'next';
import getConfig from 'next/config';
import wretch from 'wretch';
import { SINGLE_STATION_STAT } from '../../interfaces';
import { RxReset } from 'react-icons/rx';
import { useRouter } from 'next/router';

interface JourniesPageProps {
  url: string;
  title: string;
  isFiltered: boolean;
}

const { serverRuntimeConfig } = getConfig();

export default function Journies({
  url,
  title,
  isFiltered,
}: JourniesPageProps): ReactElement {
  const router = useRouter();
  let start, end;

  if (isFiltered) {
    [start, end] = title
      .split('Filtered journies from')[1]
      .split('to')
      .map((i) => i.trim());
  }

  return (
    <>
      <Header title={title} />
      <Layout>
        <Box paddingLeft={6}>
          {isFiltered && (
            <>
              <strong>Filtered journies by stations</strong>
              <ul>
                <li>
                  <p>Depature station: {start}</p>
                </li>
                <li>
                  <p>Return station: {end}</p>
                </li>
              </ul>
            </>
          )}
        </Box>
        <Flex flexDirection="row" alignItems="center" my="8" gap="4">
          <FilterJournies />
          {isFiltered && (
            <Button onClick={() => router.push('/journies/all')}>
              <RxReset />
              Reset filter
            </Button>
          )}
          <AddJourney />
          <Spacer />
        </Flex>
        <PaginationTable queryURL={url} tableFields={journiesFields} />
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const params = ctx.params?.params as string;
  const regStartEnd = /^\d*-\d*$/g;
  let url: string = '/journies?';
  let title: string = 'All Journies';
  let isFiltered: boolean = false;

  if (regStartEnd.test(params)) {
    const [start, end] = params.split('-');

    try {
      const startRes = (await wretch(
        serverRuntimeConfig.BASE_API + '/stations/' + start + '?month=5'
      )
        .get()
        .json()) as SINGLE_STATION_STAT;
      const endRes = (await wretch(
        serverRuntimeConfig.BASE_API + '/stations/' + end + '?month=5'
      )
        .get()
        .json()) as SINGLE_STATION_STAT;

      if (startRes && endRes) {
        url = `/journies/${params}?`;
        title = `Filtered journies from ${startRes.info.name} to ${endRes.info.name}`;
        isFiltered = true;
      }
    } catch (e) {
      console.warn(e);
    }
  }

  return {
    props: {
      url,
      title,
      isFiltered,
    },
  };
};
