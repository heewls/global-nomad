import { useState } from 'react';
import axios from 'axios';
import z from 'zod';
import axiosClient from '@/lib/api/axiosClient';
import useZodForm from '@/hook/useZodForm';
import useModalStore from '@/store/modal';
import { User } from '@/types/user';
import AUTH_MESSAGES from '@/contents/message/auth';

type SignupResponse = User;

interface Signup {
  email: string;
  nickname: string;
  password: string;
}

const SIGNUP_FORM = {
  email: '',
  nickname: '',
  password: '',
  passwordCheck: '',
};

export default function useSignup() {
  const [isLoading, setIsLoading] = useState(false);

  const { open, close } = useModalStore();

  const signupSchema = z
    .object({
      email: z.string().email(AUTH_MESSAGES.email.invalid),
      nickname: z.string().max(10, AUTH_MESSAGES.nickname.invalid),
      password: z.string().min(8, AUTH_MESSAGES.password.invalid),
      passwordCheck: z.string().min(8, AUTH_MESSAGES.password.invalid),
    })
    .refine((data) => data.password === data.passwordCheck, {
      path: ['passwordCheck'],
      message: AUTH_MESSAGES.passwordConfirmation.notMatch,
    });

  const form = useZodForm({
    validationSchema: signupSchema,
    defaultValues: SIGNUP_FORM,
  });

  const handleSignupSubmit = (signupForm: Signup) => {
    if (isLoading) return;

    setIsLoading(true);

    axiosClient
      .post<SignupResponse>('/users', {
        email: signupForm.email,
        nickname: signupForm.nickname,
        password: signupForm.password,
      })
      .then(() => {
        setIsLoading(false);
        open('signup-success');
      })
      .catch((error) => {
        if (!axios.isAxiosError(error)) return;

        if (error.response?.status === 409) open('email-exist');
      })
      .finally(() => setIsLoading(false));
  };

  return {
    isLoading,
    form,
    closeModal: close,
    handleSignupSubmit,
  };
}
