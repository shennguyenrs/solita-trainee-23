import {
  Link,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import type { ReactElement } from 'react';
import { DATA_FIELD, JOURNIES_INFO, STATION_INFO } from '../interfaces';

const stationsFieldsLength = 6;

export default function DataTable({
  fields,
  isLoading,
  data,
}: {
  fields: DATA_FIELD[];
  isLoading: boolean;
  data: STATION_INFO[] | JOURNIES_INFO[];
}): ReactElement {
  const SkeletonRows = () => {
    if (isLoading) {
      return (
        <>
          {fields.map((i) => (
            <Tr key={i.label}>
              {fields.map((j) => (
                <Td key={j.label}>
                  <Skeleton height="20px" />
                </Td>
              ))}
            </Tr>
          ))}
        </>
      );
    }

    if (!Boolean(data.length)) {
      return (
        <Tr>
          <Td colSpan={fields.length} textAlign="center">
            There is no data!
          </Td>
        </Tr>
      );
    }

    return fields.length === stationsFieldsLength ? (
      <>
        {(data as STATION_INFO[])?.map((i) => (
          <Tr key={i.id}>
            <Td isNumeric>{i.id}</Td>
            <Td>
              <Link href={`/stations/${i.id}`} rel="preload" as={NextLink}>
                {i.name}
              </Link>
            </Td>
            <Td>{i.address}</Td>
            <Td isNumeric>{i.capacities}</Td>
            <Td isNumeric>{i.x}</Td>
            <Td isNumeric>{i.y}</Td>
          </Tr>
        ))}
      </>
    ) : (
      <>
        {(data as JOURNIES_INFO[])?.map((i) => {
          const departureTime = new Date(i.departure);
          const returnTime = new Date(i.return);

          return (
            <Tr key={i.id}>
              <Td isNumeric>{i.id}</Td>
              <Td>{departureTime.toLocaleString('fi-FI')}</Td>
              <Td>{i.departureStationName}</Td>
              <Td>{returnTime.toLocaleString('fi-FI')}</Td>
              <Td>{i.returnStationName}</Td>
              <Td isNumeric>{i.coveredDistance}</Td>
              <Td isNumeric>{i.duration}</Td>
            </Tr>
          );
        })}
      </>
    );
  };

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              {fields.map((i, idx) => (
                <Th key={idx} isNumeric={i.isNumberic}>
                  {i.label}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            <SkeletonRows />
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
