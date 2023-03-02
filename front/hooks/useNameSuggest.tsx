import { debounce } from 'lodash';
import getConfig from 'next/config';
import { useMemo, useState } from 'react';
import wretch from 'wretch';
import { STATION_NAME } from '../interfaces';

const { publicRuntimeConfig } = getConfig();

export default function useNameSuggest() {
  const [list, setList] = useState<STATION_NAME[]>([]);

  const handleGetSuggest = useMemo(
    () =>
      debounce(async (str: string) => {
        const res = await wretch(
          publicRuntimeConfig.BASE_API + `/stations/suggest?name=${str}`
        )
          .get()
          .json();

        if (res) {
          setList(res as STATION_NAME[]);
        } else {
          setList([]);
        }
      }, 1 * 1000),
    []
  );

  return { list, setList, handleGetSuggest };
}
