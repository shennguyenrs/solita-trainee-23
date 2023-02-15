import { Button } from '@chakra-ui/react';
import type { ReactElement } from 'react';
import { RxPlus } from 'react-icons/rx';

export default function AddStation(): ReactElement {
  const handleAddStation = () => {
    console.log('Add new station');
  };

  return (
    <Button onClick={handleAddStation}>
      <RxPlus />
      <p>Add new station</p>
    </Button>
  );
}
