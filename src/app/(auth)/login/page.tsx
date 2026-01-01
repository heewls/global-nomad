'use client';

import { useState } from 'react';
import AuthTemplate from '@/components/authTemplate';
import FormField from '@/components/common/formField';
import Input from '@/components/common/input';
import Button from '@/components/common/button';
import VisibilityToggle from '@/components/visibilityToggle';

export default function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <AuthTemplate auth="login">
      <div className="flex w-full flex-col gap-6 sm:gap-7.5">
        <div className="flex flex-col gap-4 sm:gap-5">
          <FormField
            label="이메일"
            render={() => <Input placeholder="이메일을 입력해 주세요" />}
          />
          <FormField
            label="비밀번호"
            render={() => (
              <Input
                placeholder="비밀번호를 입력해 주세요"
                rightSlot={
                  <VisibilityToggle
                    isVisible={isPasswordVisible}
                    onToggle={() => setIsPasswordVisible((prev) => !prev)}
                  />
                }
              />
            )}
          />
        </div>
        <Button
          variant="primary"
          height="54"
          rounded="16"
          fontSize="16-b"
          className="w-full"
          type="submit"
        >
          로그인하기
        </Button>
      </div>
    </AuthTemplate>
  );
}
