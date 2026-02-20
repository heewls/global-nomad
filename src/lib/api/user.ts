import axiosClient from './axiosClient';
import { User } from '@/types/user';

export interface EditUserRequest {
  nickname: string;
  profileImageUrl?: string | null;
}

export async function getUserInfo(): Promise<User> {
  const response = await axiosClient.get('/users/me');

  return response.data;
}

export async function editUserInfo(payload: EditUserRequest) {
  const response = await axiosClient.patch('/users/me', {
    ...payload,
  });

  return response.data;
}

export async function postUserProfileImage(profileImageUrl: string) {
  await axiosClient.post('/users/me/image', {
    profileImageUrl,
  });
}
