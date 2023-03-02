import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import { RxChevronRight, RxMagnifyingGlass } from 'react-icons/rx';
import { STATION_NAME } from '../../interfaces';
import InputSuggest from '../InputSuggest';

export default function SearchStation(): ReactElement {
  const [selected, setSelected] = useState<STATION_NAME | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isDisabled = selected === null;
  const router = useRouter();

  const handleOnClose = () => {
    setSelected(null);
    onClose();
  };

  const handleGoToStation = () => {
    if (selected) {
      router.push('/stations/' + selected.id);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>
        <RxMagnifyingGlass /> <p>Search</p>
      </Button>
      <Modal isOpen={isOpen} onClose={handleOnClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search station by name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputSuggest
              placeholder="What station are you looking for?"
              selected={selected}
              confirmSelected={setSelected}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleGoToStation} disabled={isDisabled}>
              {selected ? selected.name : 'No station'}
              <RxChevronRight />
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
