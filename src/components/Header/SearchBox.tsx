import { Flex, Icon, Input } from '@chakra-ui/react';
import { useRef } from 'react';
import { RiSearchLine } from 'react-icons/ri';

export function SearchBox() {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <Flex
      as="label"
      flex="1"
      paddingY="4"
      paddingX="4"
      marginLeft="6"
      maxWidth={400}
      alignSelf="center"
      color="gray.200"
      position="relative"
      backgroundColor="gray.800"
      borderRadius="full"
    >
      <Input
        ref={searchInputRef}
        color="gray.50"
        variant="unstyled"
        placeholder="Buscar na plataforma"
        _placeholder={{ color: 'gray.400' }}
        paddingX="4"
        marginRight="4"
      />

      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
  );
}
