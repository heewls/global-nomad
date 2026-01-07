'use client';

import AuthTemplate from '@/components/authTemplate';
import FormField from '@/components/common/formField';
import Input from '@/components/common/input';
import PasswordVisibility from '@/components/passwordVisibility';
import usePasswordVisibility from '@/components/passwordVisibility/usePasswordVisibility';
import useSignup from './_signup/useSignup';
import Button from '@/components/common/button';
import BouncingDots from '@/components/common/loading/BouncingDots';
import AlertModal from '@/components/modals/AlertModal';
import AUTH_MESSAGES from '@/contents/message/auth';

const SIGNUP_FIELDS = [
  {
    id: 'email',
    label: '이메일',
    type: 'email',
    placeholder: '이메일을 입력해 주세요',
  },
  {
    id: 'nickname',
    label: '닉네임',
    type: 'text',
    placeholder: '닉네임을 입력해 주세요',
  },
  {
    id: 'password',
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력해 주세요',
  },
  {
    id: 'passwordCheck',
    label: '비밀번호 확인',
    type: 'password',
    placeholder: '비밀번호를 다시 입력해 주세요',
  },
] as const;

export default function Signup() {
  const {
    isLoading,
    closeModal,
    handleSignupSubmit,
    form: {
      register,
      handleSubmit,
      formState: { isValid, errors },
    },
  } = useSignup();

  const { isVisible, toggleVisibility } = usePasswordVisibility();

  return (
    <AuthTemplate auth="signup">
      <form
        onSubmit={handleSubmit(handleSignupSubmit)}
        className="flex w-full flex-col gap-6 sm:gap-7.5"
      >
        <div className="flex flex-col gap-4 sm:gap-5">
          {SIGNUP_FIELDS.map((field) => {
            const { onBlur: RHFOnBlur, ...inputProps } = register(field.id);
            const isPassword = field.type === 'password';
            const isPasswordVisible = isPassword ? isVisible(field.id) : false;

            return (
              <FormField
                key={field.id}
                label={field.label}
                errorMessage={errors[field.id]?.message}
                render={({ onFocus, onBlur, isError }) => (
                  <Input
                    type={isPassword && isPasswordVisible ? 'text' : field.type}
                    placeholder={field.placeholder}
                    isError={isError}
                    onFocus={onFocus}
                    onBlur={(e) => {
                      RHFOnBlur(e);
                      onBlur();
                    }}
                    rightSlot={
                      field.type === 'password' && (
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
          {isLoading ? <BouncingDots /> : '회원가입하기'}
        </Button>
      </form>
      <AlertModal
        modalId="signup-success"
        headerText={AUTH_MESSAGES.signup.success}
        confirmText="확인"
        confirmFunction={() => closeModal('signup-success')}
      />
      <AlertModal
        modalId="email-exist"
        headerText={AUTH_MESSAGES.email.duplicated}
        confirmText="확인"
        confirmFunction={() => closeModal('email-exist')}
      />
    </AuthTemplate>
  );
}
