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
  useToast,
} from '@chakra-ui/react';
import type { ReactElement } from 'react';
import { RxPlus } from 'react-icons/rx';
import { useForm } from 'react-hook-form';
import getConfig from 'next/config';
import wretch from 'wretch';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface ADD_STATION_FORM_DATA {
  id: number;
  name: string;
  address: string;
  capacities: number;
  x: number;
  y: number;
}

interface STATION_FORM_FIELD {
  label: string;
  value: 'id' | 'name' | 'address' | 'capacities' | 'x' | 'y';
  type: string;
}

const { publicRuntimeConfig } = getConfig();

const schema = yup.object({
  id: yup
    .number()
    .min(1, 'ID must be larger than 1')
    .required('ID is required'),
  name: yup.string().required('Station name is required'),
  address: yup.string().required('Station address is required'),
  capacities: yup
    .number()
    .min(1, 'Minimum values of capacities is 1')
    .required('Capacities is required'),
  x: yup.number().required('X coordinates is required'),
  y: yup.number().required('Y coordinates is required'),
});

const stationFormFields: STATION_FORM_FIELD[] = [
  { label: 'ID', value: 'id', type: 'number' },
  { label: 'Station name', value: 'name', type: 'text' },
  { label: 'Station address', value: 'address', type: 'text' },
  { label: 'Capacities', value: 'capacities', type: 'number' },
  { label: 'X', value: 'x', type: 'number' },
  { label: 'Y', value: 'y', type: 'number' },
];

export default function AddStation(): ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<ADD_STATION_FORM_DATA>({
    defaultValues: {
      id: 1,
      name: '',
      address: '',
      capacities: 1,
      x: 0,
      y: 0,
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const handleCloseForm = () => {
    onClose();
    reset();
  };

  const onSubmit = async (values: ADD_STATION_FORM_DATA) => {
    try {
      const res = await wretch(publicRuntimeConfig.BASE_API + '/stations')
        .post(values)
        .json();

      if (res) {
        onClose();
        reset();

        toast({
          status: 'success',
          description: 'New station saved',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (e: any) {
      toast({
        status: 'warning',
        description: e.message,
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button onClick={onOpen}>
        <RxPlus />
        <p>Add new station</p>
      </Button>
      <Modal isOpen={isOpen} onClose={handleCloseForm}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new journey</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <Flex direction="column" gap="4">
                {stationFormFields.map((i) => (
                  <FormControl
                    key={i.value}
                    isRequired
                    isInvalid={Boolean(errors[i.value])}
                  >
                    <FormLabel>{i.label}</FormLabel>
                    <Input type={i.type} step="any" {...register(i.value)} />
                    {errors[i.value] && (
                      <FormErrorMessage>
                        {errors[i.value]?.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                ))}
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                isLoading={isSubmitting}
                isDisabled={!isValid}
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
