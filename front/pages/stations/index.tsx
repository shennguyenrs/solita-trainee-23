import { Box, Flex, Spacer } from '@chakra-ui/react';
import type { ReactElement } from 'react';
import { Header, Layout } from '../../components';
import PaginationTable from '../../components/PaginationTable';
import { AddStation, SearchStation } from '../../components/stations';
import { stationsFields } from '../../libs/constants';

export default function Stations(): ReactElement {
  return (
    <>
      <Header title="All Stations" />
      <Layout>
        <Box paddingLeft={6}>
          <strong>Instructions:</strong>
          <ul>
            <li>
              <p>
                To view the station&apos;s detail, you can click on the
                station&apos;s name.
              </p>
            </li>
          </ul>
        </Box>
        <Flex flexDirection="row" alignItems="center" my="8" gap="4">
          <SearchStation />
          <AddStation />
          <Spacer />
        </Flex>
        <PaginationTable queryURL="/stations?" tableFields={stationsFields} />
      </Layout>
    </>
  );
}
