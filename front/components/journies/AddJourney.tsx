import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import getConfig from 'next/config';
import { ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RxPlus } from 'react-icons/rx';
import wretch from 'wretch';
import { STATION_NAME } from '../../interfaces';
import InputSuggest from '../InputSuggest';

interface ADD_JOURNEY_FORM_DATA {
  departure: string;
  departureStation: STATION_NAME | null;
  return: string;
  returnStation: STATION_NAME | null;
  coveredDistance: number;
  duration: number;
}

const { publicRuntimeConfig } = getConfig();

export default function AddJourney(): ReactElement {
  const [departureStation, setDepartureStation] = useState<STATION_NAME | null>(
    null
  );
  const [returnStation, setReturnStation] = useState<STATION_NAME | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ADD_JOURNEY_FORM_DATA>({
    defaultValues: {
      departure: '',
      return: '',
      coveredDistance: 10,
      duration: 10,
    },
  });

  useEffect(() => {
    if (Boolean(departureStation) && Boolean(returnStation)) {
      setIsDisabled(false);
    }
  }, [departureStation, returnStation]);

  const handleCloseForm = () => {
    setDepartureStation(null);
    setReturnStation(null);
    onClose();
    reset();
  };

  const onSubmit = async (values: ADD_JOURNEY_FORM_DATA) => {
    if (departureStation && returnStation) {
      const formatedDeparture = new Date(values.departure);
      const formatedReturn = new Date(values.return);

      const payload = {
        ...values,
        departure: formatedDeparture.toISOString(),
        return: formatedReturn.toISOString(),
        departureStationId: departureStation.id,
        returnStationId: returnStation.id,
      };

      try {
        const res = await wretch(publicRuntimeConfig.BASE_API + '/journies')
          .post(payload)
          .json();

        console.log(res);
      } catch (e) {
        toast({
          status: 'error',
          description: 'Something wrongs happens! Please try again!',
          duration: 5000,
          isClosable: true,
        });
      }

      // onClose();
      // reset();
    } else {
      toast({
        status: 'warning',
        description: 'Missing departure station or return station',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button onClick={onOpen}>
        <RxPlus />
        <p>Add new journey</p>
      </Button>
      <Modal isOpen={isOpen} onClose={handleCloseForm}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new journey</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <Flex direction="column" gap="4">
                <FormControl isRequired isInvalid={Boolean(errors.departure)}>
                  <FormLabel>Departure time</FormLabel>
                  <Input
                    type="datetime-local"
                    {...register('departure', {
                      required: 'Departure time is required',
                    })}
                  />
                  {errors.departure && (
                    <FormErrorMessage>
                      {errors.departure.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={Boolean(errors.departureStation)}
                >
                  <FormLabel>Departure station</FormLabel>
                  <InputSuggest
                    placeholder=""
                    selected={departureStation}
                    confirmSelected={setDepartureStation}
                  />
                </FormControl>
                <FormControl isRequired isInvalid={Boolean(errors.return)}>
                  <FormLabel>Return time</FormLabel>
                  <Input type="datetime-local" {...register('return')} />
                  {errors.return && (
                    <FormErrorMessage>{errors.return.message}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={Boolean(errors.returnStation)}
                >
                  <FormLabel>Return station</FormLabel>
                  <InputSuggest
                    placeholder=""
                    selected={returnStation}
                    confirmSelected={setReturnStation}
                  />
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={Boolean(errors.coveredDistance)}
                >
                  <FormLabel>Covered distance</FormLabel>
                  <Input
                    type="number"
                    {...register('coveredDistance', {
                      required: 'Covered distance is required',
                      min: {
                        value: 10,
                        message: 'Covered distance must be larger than 10m',
                      },
                      valueAsNumber: true,
                    })}
                  />
                  {errors.coveredDistance && (
                    <FormErrorMessage>
                      {errors.coveredDistance.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isRequired isInvalid={Boolean(errors.duration)}>
                  <FormLabel>Duration</FormLabel>
                  <Input
                    type="number"
                    {...register('duration', {
                      required: 'Duration is required',
                      min: {
                        value: 10,
                        message: 'Duration must be larger than 10 minutes',
                      },
                      valueAsNumber: true,
                    })}
                  />
                  {errors.duration && (
                    <FormErrorMessage>
                      {errors.duration.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                isLoading={isSubmitting}
                isDisabled={isDisabled}
              >
                Add
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
