import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps,
} from '@chakra-ui/react';

interface IInputProps extends InputProps {
  name: string;
  label?: string;
}

export function Input({ name, label, ...rest }: IInputProps) {
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={name}>E-mail</FormLabel>}
      <ChakraInput
        id="email"
        name={name}
        focusBorderColor="pink.500"
        backgroundColor="gray.900"
        variant="filled"
        _hover={{
          backgroundColor: 'gray.900',
        }}
        size="lg"
        {...rest}
      />
    </FormControl>
  );
}
