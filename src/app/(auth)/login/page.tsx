'use client';

import AuthTemplate from '@/components/authTemplate';
import FormField from '@/components/common/formField';
import Input from '@/components/common/input';
import Button from '@/components/common/button';
import PasswordVisibility from '@/components/passwordVisibility';
import BouncingDots from '@/components/common/loading/BouncingDots';
import AlertModal from '../../../components/modals/AlertModal';
import useLogin from './_login/useLogin';
import usePasswordVisibility from '@/components/passwordVisibility/usePasswordVisibility';
import AUTH_MESSAGES from '@/contents/message/auth';

const LOGIN_FIELDS = [
  {
    id: 'email',
    label: '이메일',
    type: 'email',
    placeholder: '이메일을 입력해 주세요',
    autoComplete: 'email',
  },
  {
    id: 'password',
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력해 주세요',
    autoComplete: 'new-password',
  },
] as const;

export default function Login() {
  const {
    isLoading,
    closeModal,
    handleLoginSubmit,
    form: {
      register,
      setValue,
      setFocus,
      handleSubmit,
      formState: { isValid, errors },
    },
  } = useLogin();

  const { isVisible, toggleVisibility } = usePasswordVisibility();

  return (
    <AuthTemplate auth="login">
      <form
        onSubmit={handleSubmit(handleLoginSubmit)}
        className="flex w-full flex-col gap-6 sm:gap-7.5"
      >
        <div className="flex flex-col gap-4 sm:gap-5">
          {LOGIN_FIELDS.map((field) => {
            const { onBlur: RHFOnBlur, ...inputProps } = register(field.id);
            const isPassword = field.type === 'password';
            const isPasswordVisible = isPassword ? isVisible(field.id) : false;

            return (
              <FormField
                key={field.id}
                id={field.id}
                label={field.label}
                errorMessage={errors[field.id]?.message}
                render={({ onFocus, onBlur, isError }) => (
                  <Input
                    type={isPassword && isPasswordVisible ? 'text' : field.type}
                    id={field.id}
                    autoComplete={field.autoComplete}
                    placeholder={field.placeholder}
                    isError={isError}
                    onFocus={onFocus}
                    onBlur={(e) => {
                      RHFOnBlur(e);
                      onBlur();
                    }}
                    rightSlot={
                      isPassword && (
                        <PasswordVisibility
                          isVisible={isPasswordVisible}
                          onToggle={() => toggleVisibility(field.id)}
                        />
                      )
                    }
                    {...inputProps}
                  />
                )}
              />
            );
          })}
        </div>
        <Button
          variant="primary"
          height="54"
          rounded="16"
          fontSize="16-b"
          className="w-full"
          type="submit"
          disabled={!isValid || isLoading}
        >
          {isLoading ? <BouncingDots /> : '로그인하기'}
        </Button>
      </form>
      <AlertModal
        modalId="password-wrong"
        headerText={AUTH_MESSAGES.password.wrong}
        confirmText="확인"
        confirmFunction={() => {
          setValue('password', '');
          setFocus('password');
          closeModal('password-wrong');
        }}
      />
      <AlertModal
        modalId="user-not-found"
        headerText={AUTH_MESSAGES.login.userNotFound}
        confirmText="확인"
        confirmFunction={() => closeModal('user-not-found')}
      />
    </AuthTemplate>
  );
}
