import { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { SubmitHandler, useForm } from 'react-hook-form';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useMutation } from 'react-query';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';

import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';

import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserFormSchema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: Yup.string()
    .required('Senha obrigatória')
    .min(6, 'No mínimo 6 digitos'),
  password_confirmation: Yup.string().oneOf(
    [null, Yup.ref('password')],
    'As senhas precisam ser iguais',
  ),
});

export default function CreateUser() {
  const router = useRouter();

  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      const response = await api.post('/users', {
        user: {
          ...user,
          created_at: new Date(),
        },
      });

      return response.data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
      },
    },
  );

  const { register, formState, handleSubmit } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  const { errors } = formState;

  const handleCreateUser: SubmitHandler<CreateUserFormData> = useCallback(
    async ({ name, email, password, password_confirmation }) => {
      await createUser.mutateAsync({
        name,
        email,
        password,
        password_confirmation,
      });

      router.push('/users');
    },
    [createUser, router],
  );

  return (
    <Box>
      <Header />

      <Flex
        width="100%"
        marginY="6"
        maxWidth={1480}
        marginX="auto"
        paddingX="6"
      >
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          backgroundColor="gray.800"
          padding={['6', '8']}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading fontSize="lg" fontWeight="normal">
            Criar usuário
          </Heading>

          <Divider marginY="6" borderColor="gray.700" />

          <VStack spacing={['6', '8']}>
            <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
              <Input
                name="name"
                label="Nome completo"
                error={errors.name}
                {...register('name')}
              />

              <Input
                name="email"
                label="E-mail"
                type="email"
                error={errors.email}
                {...register('email')}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} width="100%">
              <Input
                name="password"
                label="Senha"
                type="password"
                error={errors.password}
                {...register('password')}
              />
              <Input
                name="password_confirmation"
                label="Confirmação da senha"
                type="password"
                error={errors.password_confirmation}
                {...register('password_confirmation')}
              />
            </SimpleGrid>
          </VStack>

          <Flex marginTop="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                colorScheme="pink"
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
