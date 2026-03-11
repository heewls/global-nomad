'use client';

import Button from '../common/button';
import FormField from '../common/formField';
import Input from '../common/input';
import Textarea from '../common/textarea';
import InputDropdown from '../inputDropdown';
import FormImage from '@/assets/icons/translucentLogo.svg';
import FileInput from '../common/input/FileInput';
import FormImagePreview from './FormImagePreview';
import useActivityForm from './useActivityForm';
import Spinner from '../common/loading/Spinner';
import AlertModal from '../modals/AlertModal';
import Schedules from './Schedules';
import BouncingDots from '../common/loading/BouncingDots';
import CATEGORY_OPTIONS from '@/contents/category';
import { ActivityDetail } from '@/types/activities';

export default function ActivityForm({
  activity,
}: {
  activity?: ActivityDetail;
}) {
  const {
    form,
    isLoading,
    bannerImage,
    subImages,
    imageLoadingType,
    buttonChildren,
    successModalText,
    errorModalText,
    handleImageChange,
    handleBannerImageDelete,
    handleSubImagesDelete,
    handleFormSubmit,
    successConfirm,
    closeErrorModal,
  } = useActivityForm(activity);

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { isValid },
  } = form;

  const category = watch('category');

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col items-center gap-6"
    >
      <div className="flex w-full flex-col gap-7.5">
        <div className="flex flex-col gap-6">
          <FormField
            id="title"
            label="제목"
            render={() => {
              const { ...inputProps } = register('title');
              return (
                <Input
                  type="text"
                  placeholder="제목을 입력해 주세요"
                  {...inputProps}
                />
              );
            }}
          />
          <FormField
            id="category"
            label="카테고리"
            render={() => (
              <InputDropdown
                id="category"
                placeholder="카테고리를 선택해 주세요"
                value={category}
                options={CATEGORY_OPTIONS}
                onSelect={(option: string) => setValue('category', option)}
              />
            )}
          />
          <FormField
            id="description"
            label="설명"
            render={() => {
              const { ...inputProps } = register('description');
              return (
                <Textarea
                  id="description"
                  placeholder="체험에 대한 설명을 입력해 주세요"
                  {...inputProps}
                />
              );
            }}
          />
          <FormField
            id="price"
            label="가격"
            render={() => {
              const { name, ref } = register('price');
              const priceValue = watch('price');
              const displayValue =
                priceValue === 0 || !priceValue
                  ? ''
                  : Number(priceValue).toLocaleString();

              return (
                <Input
                  type="text"
                  placeholder="체험 금액을 입력해 주세요"
                  name={name}
                  ref={ref}
                  value={displayValue}
                  onChange={(e) => {
                    const onlyNumber = e.target.value.replace(/[^0-9]/g, '');
                    const numberPrice = onlyNumber ? Number(onlyNumber) : 0;

                    setValue('price', numberPrice, { shouldValidate: true });
                  }}
                />
              );
            }}
          />
          <FormField
            id="address"
            label="주소"
            render={() => {
              const { ...inputProps } = register('address');
              return (
                <Input
                  type="text"
                  placeholder="주소를 입력해 주세요"
                  {...inputProps}
                />
              );
            }}
          />
        </div>

        <div className="flex flex-col gap-4.5">
          <h2 className="text-16-b">예약 가능한 시간대</h2>
          <Schedules form={form} />
        </div>
        <div className="flex flex-col gap-2.5">
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
                  className="border-gray100 flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-lg border bg-transparent sm:h-32 sm:w-32 sm:gap-2.5"
                >
                  <FormImage className="h-8 w-8 sm:h-10 sm:w-10" />
                  <span className="text-13-m sm:text-14-m text-gray600">
                    {bannerImage ? 1 : 0}/1
                  </span>
                </div>
              )}
            </FileInput>
            {bannerImage && imageLoadingType !== 'banner' && (
              <FormImagePreview
                image={bannerImage}
                deleteImage={handleBannerImageDelete}
              />
            )}
            {imageLoadingType === 'banner' && (
              <div className="flex h-20 w-20 items-center justify-center sm:h-32 sm:w-32">
                <Spinner className="h-6 w-6" />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
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
                deleteImage={() => handleSubImagesDelete(idx)}
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
        disabled={!isValid || isLoading}
        variant="primary"
        height="40"
        rounded="12"
        fontSize="14-b"
        className="w-30"
      >
        {isLoading ? <BouncingDots /> : buttonChildren}
      </Button>
      <AlertModal
        modalId="success-write"
        headerText={successModalText}
        confirmText="확인"
        confirmFunction={successConfirm}
      />
      <AlertModal
        modalId="error-write"
        headerText={errorModalText}
        confirmText="확인"
        confirmFunction={closeErrorModal}
      />
    </form>
  );
}
