import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { editUserInfo, EditUserRequest, getUserInfo } from '../api/user';

export function useGetUserProfile() {
  return useQuery({
    queryKey: ['user-profile'],
    queryFn: () => getUserInfo(),
  });
}

export function useEditUserInfo() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: EditUserRequest) => editUserInfo(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-profile'],
      });
    },
  });

  return { ...mutation, editUserMutation: mutation.mutateAsync };
}
