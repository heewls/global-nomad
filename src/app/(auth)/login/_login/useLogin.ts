import { useRouter } from 'next/navigation';
import { useState } from 'react';
import z from 'zod';
import useZodForm from '@/hook/useZodForm';
import axiosClient from '@/lib/api/axiosClient';
import { setToken } from '@/lib/clientCookie';
import useUserStore from '@/store/user';
import { User } from '@/types/user';
import AUTH_MESSAGES from '@/contents/message/auth';
import axios from 'axios';
import useModalStore from '@/store/modal';

interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

interface Login {
  email: string;
  password: string;
}

const LOGIN_FORM = {
  email: '',
  password: '',
};

export default function useLogin() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { setUser } = useUserStore();
  const { open, close } = useModalStore();

  const handleTogglePasswordClick = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const closeModal = (id: string) => {
    close(id);
  };

  const loginSchema = z.object({
    email: z.string().email(AUTH_MESSAGES.email.invalid),
    password: z.string().min(8, AUTH_MESSAGES.password.invalid),
  });

  const form = useZodForm({
    validationSchema: loginSchema,
    defaultValues: LOGIN_FORM,
  });

  const handleLoginSubmit = (loginForm: Login) => {
    if (isLoading) return;

    setIsLoading(true);

    axiosClient
      .post<LoginResponse>('/auth/login', {
        email: loginForm.email,
        password: loginForm.password,
      })
      .then((response) => {
        const data = response.data;
        setUser(data.user);
        setToken('accessToken', data.accessToken);
        setToken('refreshToken', data.refreshToken);
        router.push('/');
        setIsLoading(false);
      })
      .catch((error) => {
        if (!axios.isAxiosError(error)) return;

        switch (error.response?.status) {
          case 400:
            open('password-wrong');
            break;
          case 404:
            open('user-not-found');
            break;
          default:
            console.log(error);
        }
      })
      .finally(() => setIsLoading(false));
  };

  return {
    isLoading,
    isPasswordVisible,
    form,
    closeModal,
    handleTogglePasswordClick,
    handleLoginSubmit,
  };
}
