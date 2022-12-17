import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { api } from '../services/api';

type IUser = {
  id: string;
  name: string;
  email: string;
  created_at: string;
  created_at_formatted: string;
};

type IGetUsersResponse = {
  totalCount: number;
  users: Array<IUser>;
};

async function getUsers(page: number): Promise<IGetUsersResponse> {
  const response = await api.get('/users', {
    params: {
      page,
    },
  });

  const totalCount = Number(response.headers['x-total-count']);

  const d = await response.data;

  /**
   * Porque d.users? Onde vem esse users?
   * Esse users é o nome da chave que passamos no primeiro parâmetro
   */
  const usersData = d.users as IUser[];

  const users = usersData.map(user => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      created_at_formatted: new Date(user.created_at).toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        },
      ),
    };
  });

  return {
    users,
    totalCount,
  };
}

function useUsers(page: number, options?: UseQueryOptions) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, // 10 minutos
    ...options,
  }) as UseQueryResult<IGetUsersResponse, unknown>;
}

export { useUsers, getUsers };
