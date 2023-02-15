import { Box, Flex, Spacer } from '@chakra-ui/react';
import type { ReactElement } from 'react';
import { Header, Layout } from '../../components';
import PaginationTable from '../../components/PaginationTable';
import { AddStation } from '../../components/stations';
import { journiesFields } from '../../libs/constants';

export default function Journies(): ReactElement {
  return (
    <>
      <Header title="All journies" />
      <Layout>
        <Box paddingLeft={6}>
          <strong>Instructions:</strong>
          <ul>
            <li>
              <p>nothing</p>
            </li>
          </ul>
        </Box>
        <Flex flexDirection="row" alignItems="center" my="8">
          <AddStation />
          <Spacer />
        </Flex>
        <PaginationTable queryURL="/journies?" tableFields={journiesFields} />
      </Layout>
    </>
  );
}
