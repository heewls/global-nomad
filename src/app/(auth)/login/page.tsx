'use client';

import AuthTemplate from '@/components/authTemplate';
import FormField from '@/components/common/formField';
import Input from '@/components/common/input';
import Button from '@/components/common/button';
import VisibilityToggle from '@/components/visibilityToggle';
import AUTH_MESSAGES from '@/contents/message/auth';
import useLogin from './_login/useLogin';
import BouncingDots from '@/components/common/loading/BouncingDots';
import AlertModal from '../../../components/modals/AlertModal';

export default function Login() {
  const {
    isLoading,
    isPasswordVisible,
    form: {
      register,
      handleSubmit,
      formState: { errors },
    },
    closeModal,
    handleTogglePasswordClick,
    handleLoginSubmit,
  } = useLogin();

  const emailRegister = register('email');
  const passwordRegister = register('password');

  return (
    <AuthTemplate auth="login">
      <form
        onSubmit={handleSubmit(handleLoginSubmit)}
        className="flex w-full flex-col gap-6 sm:gap-7.5"
      >
        <div className="flex flex-col gap-4 sm:gap-5">
          <FormField
            label="이메일"
            errorMessage={errors?.email?.message}
            render={({ onFocus, onBlur, isError }) => {
              const { onBlur: RHFOnBlur, ...inputProps } = emailRegister;

              return (
                <Input
                  type="email"
                  placeholder="이메일을 입력해 주세요"
                  isError={isError}
                  onFocus={onFocus}
                  onBlur={(e) => {
                    RHFOnBlur(e);
                    onBlur();
                  }}
                  {...inputProps}
                />
              );
            }}
          />
          <FormField
            label="비밀번호"
            errorMessage={errors?.password?.message}
            render={({ onFocus, onBlur, isError }) => {
              const { onBlur: RHFOnBlur, ...inputProps } = passwordRegister;

              return (
                <Input
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder="비밀번호를 입력해 주세요"
                  rightSlot={
                    <VisibilityToggle
                      isVisible={isPasswordVisible}
                      onToggle={handleTogglePasswordClick}
                    />
                  }
                  isError={isError}
                  onFocus={onFocus}
                  onBlur={(e) => {
                    RHFOnBlur(e);
                    onBlur();
                  }}
                  {...inputProps}
                />
              );
            }}
          />
        </div>
        <Button
          variant="primary"
          height="54"
          rounded="16"
          fontSize="16-b"
          className="w-full"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <BouncingDots /> : '로그인하기'}
        </Button>
      </form>
      <AlertModal
        modalId="password-error"
        headerText={AUTH_MESSAGES.password.wrong}
        confirmText="확인"
        confirmFunction={() => {}}
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
