'use client';

import { useEffect } from 'react';
import FormField from '@/components/common/formField';
import Input from '@/components/common/input';
import FileInput from '@/components/common/input/FileInput';
import Button from '@/components/common/button';
import BouncingDots from '@/components/common/loading/BouncingDots';
import ProfileImage from '@/components/profileImage';
import AlertModal from '@/components/modals/AlertModal';
import useProfile from './_my_profile/useProfile';
import useUserStore from '@/store/user';
import useModalStore from '@/store/modal';
import Edit from '@/assets/icons/edit.svg';

export default function MyProfile() {
  const {
    form,
    isLoading,
    profileImage,
    resetForm,
    handleProfileImageChange,
    handleFormSubmit,
  } = useProfile();
  const { user } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = form;

  const { close } = useModalStore();

  useEffect(() => {
    if (user) {
      form.reset({
        nickname: user.nickname,
        profileImageUrl: user.profileImageUrl,
      });
    }
  }, [user, form]);

  const PROFILE_FIELDS = [
    {
      id: 'nickname',
      label: '닉네임',
      type: 'text',
      placeholder: '닉네임을 입력해 주세요',
      autoComplete: 'username',
      className: '',
    },
    {
      id: 'email',
      label: '이메일',
      type: 'email',
      placeholder: user?.email,
      autoComplete: 'email',
      className: 'cursor-default',
    },
  ] as const;

  return (
    <div className="flex flex-col gap-5 md:gap-6">
      <div className="flex flex-col gap-2.5 py-2.5 md:gap-1">
        <h2 className="text-18-b">내 정보</h2>
        <h3 className="text-14-m text-gray500">
          회원정보를 수정할 수 있습니다.
        </h3>
      </div>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-8 md:gap-6"
      >
        <div className="flex flex-col gap-4.5 md:gap-6">
          <FormField
            id="profileImage"
            label="프로필 이미지"
            render={() => (
              <FileInput onChange={(e) => handleProfileImageChange(e)}>
                {({ fileInputRef }) => (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="relative w-fit cursor-pointer"
                  >
                    <ProfileImage
                      className="h-30 w-30 md:h-17.5 md:w-17.5 lg:h-30 lg:w-30"
                      image={profileImage}
                    />
                    <div className="bg-gray300 absolute right-0 bottom-1 flex h-7.5 w-7.5 cursor-pointer items-center justify-center rounded-full md:h-6 md:w-6 lg:h-7.5 lg:w-7.5">
                      <Edit className="h-4 w-4 md:h-3 md:w-3 lg:h-4 lg:w-4" />
                    </div>
                  </div>
                )}
              </FileInput>
            )}
          />
          {PROFILE_FIELDS.map((field) => {
            const { onBlur: RHFOnBlur, ...inputProps } = register(field.id);
            const isEmail = field.id === 'email';

            return (
              <FormField
                key={field.id}
                id={field.id}
                label={field.label}
                errorMessage={errors[field.id]?.message}
                render={({ onFocus, onBlur, isError }) => (
                  <Input
                    type={field.type}
                    id={field.id}
                    autoComplete={field.autoComplete}
                    placeholder={field.placeholder}
                    isError={isError}
                    readOnly={isEmail}
                    onFocus={onFocus}
                    onBlur={(e) => {
                      RHFOnBlur(e);
                      onBlur();
                    }}
                    inputBgClassName={field.className}
                    inputClassName={field.className}
                    {...inputProps}
                  />
                )}
              />
            );
          })}
        </div>
        <div className="flex justify-center gap-3">
          <Button
            type="button"
            onClick={resetForm}
            variant="outline"
            height="54"
            rounded="16"
            fontSize="16-b"
            className="flex-1 md:hidden"
          >
            취소하기
          </Button>
          <Button
            type="submit"
            variant="primary"
            height="54"
            rounded="16"
            fontSize="16-b"
            className="flex-1 md:w-30 md:flex-none"
            disabled={!isDirty || !isValid || isLoading}
          >
            {isLoading ? <BouncingDots /> : '저장하기'}
          </Button>
        </div>
      </form>
      <AlertModal
        modalId="success-edit-profile"
        headerText="프로필 변경이 완료되었습니다."
        confirmText="확인"
        confirmFunction={() => close('success-edit-profile')}
      />
    </div>
  );
}
