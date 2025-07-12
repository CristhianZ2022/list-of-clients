import { fetchUsers } from '../services/users';
import {
  useInfiniteQuery,
  useQueryClient,
  type InfiniteData,
} from '@tanstack/react-query';
import { type User } from '../types.d';

export const useUsers = () => {
  const queryClient = useQueryClient();

  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery<
      { users: User[]; nextCursor?: number | null },
      Error,
      InfiniteData<{ users: User[]; nextCursor: number | null }>,
      ['users'],
      number // Especifico aquí que pageParam es de tipo number
    >({
      queryKey: ['users'],
      queryFn: async ({ pageParam = 1 }) => await fetchUsers({ pageParam }),
      getNextPageParam: lastPage => lastPage.nextCursor,
      initialPageParam: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 3,
    });

  const deletedUser = (email: string) => {
    queryClient.setQueryData<InfiniteData<{ users: User[], nextCursor: number | null }>>(
      ['users'],
      oldData => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        pages: oldData.pages.map(user => ({
          ...user,
          users: user.users.filter(user => user.email !== email),
        })),
      };
    });
  };

  return {
    isLoading,
    isError,
    users: data?.pages?.flatMap(page => page.users) || [],
    refetch,
    fetchNextPage,
    hasNextPage,
    deletedUser,
  };
};
