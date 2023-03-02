import { Button, Flex, Input, Select, Text, Tooltip } from '@chakra-ui/react';
import getConfig from 'next/config';
import { ChangeEvent, KeyboardEvent, ReactElement, useState } from 'react';
import {
  RxChevronLeft,
  RxChevronRight,
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
  RxReset
} from 'react-icons/rx';
import useSWR, { Fetcher } from 'swr';
import wretch from 'wretch';
import { DataTable } from '../components';
import { DATA_FIELD, SORT_BY } from '../interfaces';
import { initialPagiPara } from '../libs/constants';

const { publicRuntimeConfig } = getConfig();
const fetcher: Fetcher<any, string> = (s: string) => wretch(s).get().json();

export interface PaginationTableProps {
  queryURL: string;
  tableFields: DATA_FIELD[];
}

export default function PaginationTable({
  queryURL,
  tableFields,
}: PaginationTableProps): ReactElement {
  const [pagi, setPagi] = useState(initialPagiPara);
  const [editing, setEditing] = useState<string>('');
  const { data, error, isLoading } = useSWR<any, Error>(
    publicRuntimeConfig.BASE_API +
      `${queryURL}page=${pagi.currentPage}&show=${pagi.show}&sort_by=${pagi.sort}&order_by=${pagi.order}`,
    fetcher
  );

  const rows = data?.data;
  const final = data?.pagination.allPages || 1;

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEditing(e.currentTarget.value);
  };

  const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (Number(editing)) {
        setPagi({
          ...pagi,
          currentPage: Number(editing),
        });
      }

      e.currentTarget.blur();
    }
  };

  const handleResetPagi = () => {
    setPagi(initialPagiPara);
  };

  if (error) {
    return (
      <Flex justifyContent="center" alignItems="center" h="60vh">
        <p>Something wrong happens! Please try again!</p>
      </Flex>
    );
  }

  return (
    <Flex flexDirection="column" gap={2}>
      <Flex
        flexDirection="row"
        justifyContent="flex-end"
        alignItems="center"
        gap={4}
      >
        <Flex flexDirection="row" alignItems="center" gap={2}>
          <Text>Order by</Text>
          <Select
            maxWidth="fit-content"
            value={pagi.order}
            onChange={(e) => setPagi({ ...pagi, order: e.target.value })}
          >
            {tableFields.map((i, idx) => (
              <option key={idx} value={i.value}>
                {i.label.toUpperCase()}
              </option>
            ))}
          </Select>
        </Flex>
        <Flex flexDirection="row" alignItems="center" gap={2}>
          <Text>Sort by</Text>
          <Select
            maxWidth="fit-content"
            value={pagi.sort}
            onChange={(e) =>
              setPagi({ ...pagi, sort: e.target.value as SORT_BY })
            }
          >
            <option value={SORT_BY.ASC}>ASC</option>
            <option value={SORT_BY.DESC}>DESC</option>
          </Select>
        </Flex>
        <Flex flexDirection="row" alignItems="center" gap={2}>
          <Text>Show</Text>
          <Select
            maxWidth="fit-content"
            value={pagi.show}
            onChange={(e) => setPagi({ ...pagi, show: Number(e.target.value) })}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </Select>
        </Flex>
        <Tooltip label="Reset all sort and order" aria-label="tooltip-reset">
          <Button onClick={handleResetPagi}>
            <RxReset />
          </Button>
        </Tooltip>
      </Flex>
      <DataTable fields={tableFields} isLoading={isLoading} data={rows} />
      <Flex
        flexDirection="row"
        justifyContent="flex-end"
        alignItems="center"
        gap={2}
        mt={4}
      >
        <Button
          disabled={pagi.currentPage === 1}
          onClick={() => setPagi({ ...pagi, currentPage: 1 })}
        >
          <RxDoubleArrowLeft />
        </Button>
        <Button
          disabled={pagi.currentPage === 1}
          onClick={() =>
            setPagi({ ...pagi, currentPage: pagi.currentPage - 1 })
          }
        >
          <RxChevronLeft />
        </Button>
        <Input
          variant="flushed"
          size="sm"
          placeholder={pagi.currentPage.toString()}
          type="number"
          onKeyDown={handleOnKeyDown}
          onChange={handleChangeInput}
          width="4rem"
          value={editing}
        />{' '}
        <p>/{final}</p>
        <Button
          disabled={pagi.currentPage === final}
          onClick={() =>
            setPagi({ ...pagi, currentPage: pagi.currentPage + 1 })
          }
        >
          <RxChevronRight />
        </Button>
        <Button
          disabled={pagi.currentPage == final}
          onClick={() => setPagi({ ...pagi, currentPage: final })}
        >
          <RxDoubleArrowRight />
        </Button>
      </Flex>
    </Flex>
  );
}
