import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  List,
  ListItem,
} from '@chakra-ui/react';
import { ChangeEvent, ReactElement, useState } from 'react';
import useNameSuggest from '../hooks/useNameSuggest';
import { STATION_NAME } from '../interfaces';

export default function InputSuggest({
  placeholder,
  selected,
  confirmSelected,
}: {
  placeholder: string;
  selected: STATION_NAME | null;
  confirmSelected: (i: STATION_NAME) => void;
}): ReactElement {
  const [input, setInput] = useState<string>('');
  const { list, setList, handleGetSuggest } = useNameSuggest();
  const isError =
    selected === null && Boolean(input.length) && !Boolean(list.length);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value;
    setInput(newInput);

    if (newInput) {
      handleGetSuggest(newInput);
    }
  };

  const handleClickOnItem = (i: STATION_NAME) => {
    setInput(i.name);
    setList([]);
    confirmSelected(i);
  };

  return (
    <FormControl isRequired isInvalid={isError}>
      <Input
        placeholder={placeholder}
        value={input}
        onChange={handleInputChange}
      />
      {isError && <FormErrorMessage>Invalid station name</FormErrorMessage>}
      {Boolean(list.length) && (
        <List spacing="2" mt="2" pl="2">
          {list.slice(0, 5).map((i) => (
            <ListItem key={i.id}>
              <Button
                variant="ghost"
                fontWeight="normal"
                onClick={() => handleClickOnItem(i)}
              >
                {i.name}
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </FormControl>
  );
}
