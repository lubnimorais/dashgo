import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

export function Profile() {
  return (
    <Flex align="center">
      <Box marginRight="4" textAlign="right">
        <Text>Lubni Morais</Text>
        <Text color="gray.300" fontSize="small">
          lubni.morais@gmail.com
        </Text>
      </Box>

      <Avatar
        size="md"
        name="Lubni Morais"
        src="https://github.com/lubnimorais.png"
      />
    </Flex>
  );
}
