import { useState } from 'react';
import axios from 'axios';
import z from 'zod';
import axiosClient from '@/lib/api/axiosClient';
import useZodForm from '@/hook/useZodForm';
import { useEditUserInfo, useGetUserProfile } from '@/lib/querys/userQuery';
import useUserStore from '@/store/user';
import useModalStore from '@/store/modal';
import { EditUserRequest } from '@/lib/api/user';
import AUTH_MESSAGES from '@/contents/message/auth';

interface ProfileFormData extends Partial<EditUserRequest> {
  email: string;
}

export default function useProfile() {
  const [isLoading, setIsLoading] = useState(false);

  const { open } = useModalStore();
  const { updateUserProfile } = useUserStore();
  const { data: user } = useGetUserProfile();

  const PROFILE_FORM = {
    nickname: user?.nickname,
    email: '',
    profileImageUrl: user?.profileImageUrl,
  };

  const profileSchema = z.object({
    email: z.string(),
    nickname: z
      .string()
      .min(1, AUTH_MESSAGES.nickname.required)
      .max(10, AUTH_MESSAGES.nickname.invalid),
    profileImageUrl: z.string().url().nullable(),
  });

  const form = useZodForm({
    validationSchema: profileSchema,
    defaultValues: PROFILE_FORM,
  });

  const handleProfileImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    await axiosClient
      .post('/users/me/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        const newProfileImage = response.data.profileImageUrl;

        form.setValue('profileImageUrl', newProfileImage, {
          shouldValidate: true,
        });
      });
  };

  const { editUserMutation } = useEditUserInfo();

  const handleFormSubmit = (profileForm: ProfileFormData) => {
    if (!user) return;

    const payload: EditUserRequest = {
      nickname: profileForm.nickname || user.nickname,
      profileImageUrl: profileForm.profileImageUrl || user.profileImageUrl,
    };

    setIsLoading(true);

    editUserMutation({ ...payload })
      .then((response) => {
        setIsLoading(false);
        open('success-edit-profile');

        const newProfile = {
          nickname: response.nickname,
          profileImageUrl: response.profileImageUrl,
        };

        form.reset({
          ...newProfile,
        });
        updateUserProfile(newProfile);
      })
      .catch((error) => {
        if (!axios.isAxiosError(error)) return;
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

  const profileImage = form.watch('profileImageUrl') ?? user?.profileImageUrl;

  return {
    form,
    isLoading,
    profileImage,
    handleProfileImageChange,
    handleFormSubmit,
  };
}
