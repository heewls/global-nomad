'use client';

import Button from '../common/button';
import FormField from '../common/formField';
import Input from '../common/input';
import Textarea from '../common/textarea';
import InputDropdown from '../inputDropdown';
import Calendar from '@/../public/icons/calendar.svg';
import Plus from '@/assets/icons/plus.svg';

export default function ActivityForm() {
  return (
    <form className="flex flex-col items-center gap-6">
      <div className="flex w-full flex-col gap-7.5">
        <div className="flex flex-col gap-6">
          <FormField
            id="title"
            label="제목"
            render={() => <Input placeholder="제목을 입력해 주세요" />}
          />
          <FormField
            id="category"
            label="카테고리"
            render={() => (
              <InputDropdown
                placeholder="카테고리를 선택해 주세요"
                defaultValue=""
                options={[
                  '문화 ∙ 예술',
                  '식음료',
                  '스포츠',
                  '투어',
                  '관광',
                  '웰빙',
                ]}
                onSelect={() => {}}
              />
            )}
          />
          <FormField
            id="description"
            label="설명"
            render={() => (
              <Textarea placeholder="체험에 대한 설명을 입력해 주세요" />
            )}
          />
          <FormField
            id="price"
            label="가격"
            render={() => <Input placeholder="체험 금액을 입력해 주세요" />}
          />
          <FormField
            id="address"
            label="주소"
            render={() => <Input placeholder="주소를 입력해 주세요" />}
          />
        </div>
        <div className="flex flex-col gap-4.5">
          <h2 className="text-16-b">예약 가능한 시간대</h2>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <FormField
              id="date"
              label="날짜"
              render={() => (
                <Input
                  readOnly
                  placeholder="yy/mm/dd"
                  rightSlot={<Calendar />}
                />
              )}
            />
            <div className="flex items-end gap-3.5">
              <div className="flex items-end gap-2.5">
                <div className="flex flex-col gap-2.5">
                  <label className="text-14-m sm:text-16-m hidden sm:flex">
                    시작 시간
                  </label>
                  <InputDropdown
                    placeholder="00:00"
                    defaultValue=""
                    options={['00:00', '00:30']}
                    onSelect={() => {}}
                    inputClassName="sm:min-w-30"
                  />
                </div>
                <div className="bg-gray800 mb-[27px] h-0.5 w-2" />
                <div className="flex flex-col gap-2.5">
                  <label className="text-14-m sm:text-16-m hidden sm:flex">
                    종료 시간
                  </label>
                  <InputDropdown
                    placeholder="00:00"
                    defaultValue=""
                    options={['00:00', '00:30']}
                    onSelect={() => {}}
                    inputClassName="sm:min-w-30"
                  />
                </div>
              </div>
              <button
                type="button"
                className="bg-primary500 mb-[13px] flex h-7 w-7 shrink-0 items-center justify-center rounded-full sm:mb-1.5 sm:h-10.5 sm:w-10.5"
              >
                <Plus className="h-4 w-4 sm:h-6 sm:w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Button
        variant="primary"
        height="40"
        rounded="12"
        fontSize="14-b"
        className="w-30"
      >
        등록하기
      </Button>
    </form>
  );
}
