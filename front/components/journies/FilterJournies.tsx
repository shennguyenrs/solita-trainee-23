import {
  Button,
  Flex,
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

export default function FilterJournies(): ReactElement {
  const [startingStation, setStartingStation] = useState<STATION_NAME | null>(
    null
  );
  const [endingStation, setEndingStation] = useState<STATION_NAME | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isEnabled = Boolean(startingStation) && Boolean(endingStation);
  const router = useRouter();

  const handleOnClose = () => {
    setStartingStation(null);
    setEndingStation(null);
    onClose();
  };

  const handleDoFilter = () => {
    if (startingStation && endingStation) {
      router.push('/journies/' + startingStation.id + '-' + endingStation.id);
    }

    handleOnClose();
  };

  return (
    <>
      <Button onClick={onOpen}>
        <RxMagnifyingGlass /> <p>Filter by stations</p>
      </Button>
      <Modal isOpen={isOpen} onClose={handleOnClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filter journies by stations</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" gap="4">
              <InputSuggest
                placeholder="Enter starting station"
                selected={startingStation}
                confirmSelected={setStartingStation}
              />
              <InputSuggest
                placeholder="Enter ending station"
                selected={endingStation}
                confirmSelected={setEndingStation}
              />
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleDoFilter} disabled={!isEnabled}>
              Confirm <RxChevronRight />
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
