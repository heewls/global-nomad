'use client';

import Button from '../common/button';
import FormField from '../common/formField';
import Input from '../common/input';
import Textarea from '../common/textarea';
import InputDropdown from '../inputDropdown';
import Calendar from '@/../public/icons/calendar.svg';
import Plus from '@/assets/icons/plus.svg';
import Minus from '@/assets/icons/minus.svg';
import FormImage from '@/assets/icons/translucentLogo.svg';
import FileInput from '../common/input/FileInput';
import FormImagePreview from './FormImagePreview';
import useActivityForm from './useActivityForm';
import Spinner from '../common/loading/Spinner';

export default function ActivityForm() {
  const {
    form: {
      register,
      handleSubmit,
      formState: { isValid },
    },
    scheduleSlots,
    bannerImage,
    subImages,
    imageLoadingType,
    handleAddSlot,
    handleImageChange,
  } = useActivityForm();

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
          <div className="flex flex-col gap-4 sm:gap-5">
            {scheduleSlots.map((slot, index) => (
              <div key={slot.id} className="flex flex-col gap-4 sm:gap-5">
                {index === 1 && (
                  <div className="border-gray100 w-full border-t" />
                )}

                <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3.5">
                  <div className="flex flex-1 flex-col gap-2 sm:gap-2.5">
                    {index === 0 && (
                      <label className="text-14-m sm:text-16-m">날짜</label>
                    )}
                    <Input
                      readOnly
                      placeholder="yy/mm/dd"
                      rightSlot={<Calendar className="shrink-0" />}
                      inputBgClassName="cursor-pointer"
                      inputClassName="cursor-pointer"
                    />
                  </div>

                  <div className="flex flex-1 items-end gap-3.5">
                    <div className="flex items-end gap-2.5">
                      <div className="flex flex-col gap-2 sm:gap-2.5">
                        {index === 0 && (
                          <label className="text-14-m sm:text-16-m hidden sm:flex">
                            시작 시간
                          </label>
                        )}
                        <InputDropdown
                          options={['00:00', '00:30']}
                          defaultValue=""
                          placeholder="00:00"
                          onSelect={() => {}}
                          inputClassName="sm:min-w-30"
                        />
                      </div>
                      <div className="bg-gray800 mb-[27px] h-0.5 w-2" />
                      <div className="flex flex-col gap-2 sm:gap-2.5">
                        {index === 0 && (
                          <label className="text-14-m sm:text-16-m hidden sm:flex">
                            종료 시간
                          </label>
                        )}
                        <InputDropdown
                          options={['00:00', '00:30']}
                          defaultValue=""
                          placeholder="00:00"
                          onSelect={() => {}}
                          inputClassName="sm:min-w-30"
                        />
                      </div>
                    </div>

                    {index === 0 ? (
                      <button
                        type="button"
                        onClick={handleAddSlot}
                        className="bg-primary500 mb-[13px] flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white sm:mb-1.5 sm:h-10.5 sm:w-10.5"
                      >
                        <Plus className="h-4 w-4 sm:h-6 sm:w-6" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="bg-gray50 mb-[13px] flex h-7 w-7 shrink-0 items-center justify-center rounded-full sm:mb-1.5 sm:h-10.5 sm:w-10.5"
                      >
                        <Minus className="h-4 w-4 sm:h-6 sm:w-6" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-16-b">배너 이미지</h2>
          <div className="flex gap-3 sm:gap-3.5">
            <FileInput
              onChange={(e) =>
                handleImageChange({ e, image: 'bannerImageUrl' })
              }
            >
              {({ fileInputRef }) => (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-gray100 flex h-20 w-20 cursor-pointer items-center justify-center gap-0.5 rounded-lg border bg-transparent sm:h-32 sm:w-32 sm:gap-2.5"
                >
                  <FormImage className="h-8 w-8 sm:h-10 sm:w-10" />
                </div>
              )}
            </FileInput>
            {bannerImage && imageLoadingType !== 'banner' && (
              <FormImagePreview image={bannerImage} deleteImage={() => {}} />
            )}
            {imageLoadingType === 'banner' && (
              <div className="flex h-20 w-20 items-center justify-center sm:h-32 sm:w-32">
                <Spinner className="h-6 w-6" />
              </div>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-16-b">소개 이미지</h2>
          <div className="flex gap-3 sm:gap-3.5">
            <FileInput
              disabled={subImages?.length === 4}
              onChange={(e) => handleImageChange({ e, image: 'subImageUrls' })}
            >
              {({ fileInputRef }) => (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-gray100 flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-lg border bg-transparent sm:h-32 sm:w-32 sm:gap-2.5"
                >
                  <FormImage className="h-8 w-8 sm:h-10 sm:w-10" />
                  <span className="text-13-m sm:text-14-m text-gray600">
                    {subImages?.length}/4
                  </span>
                </div>
              )}
            </FileInput>
            {subImages?.map((subImage, idx) => (
              <FormImagePreview
                key={`${subImage}-${idx}`}
                image={subImage}
                deleteImage={() => {}}
              />
            ))}
            {imageLoadingType === 'sub' && (
              <div className="flex h-20 w-20 items-center justify-center sm:h-32 sm:w-32">
                <Spinner className="h-6 w-6" />
              </div>
            )}
          </div>
        </div>
      </div>

      <Button
        disabled={isValid}
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
