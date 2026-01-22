import { UseFormReturn } from 'react-hook-form';
import Input from '../../common/input';
import Calendar from '../../calendar';
import Dropdown from '@/components/common/dropdown';
import InputDropdown from '../../inputDropdown';
import AlertModal from '@/components/modals/AlertModal';
import CalendarIcon from '@/../public/icons/calendar.svg';
import Plus from '@/assets/icons/plus.svg';
import Minus from '@/assets/icons/minus.svg';
import useSchedules from './useSchedules';
import { ActivityRequest } from '@/types/activities';

export default function Schedules({
  form,
}: {
  form: UseFormReturn<ActivityRequest>;
}) {
  const {
    TIME_SLOTS,
    addingSlot,
    timeErrorModal,
    savedSchedules,
    close,
    handleAddingSlotChange: onAddingSelect,
    handleSavedScheduleChange: onSavedSelect,
    handleSlotAdd: onAdd,
    handleSlotDelete: onDelete,
  } = useSchedules(form);

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      <div className="flex flex-col gap-4 sm:gap-5">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3.5">
          <div className="relative flex flex-1 flex-col gap-2 sm:gap-2.5">
            <label htmlFor="date" className="text-14-m sm:text-16-m">
              날짜
            </label>
            <Dropdown
              dropdownButton={() => (
                <Input
                  readOnly
                  id="date"
                  placeholder="yy/mm/dd"
                  value={addingSlot.date}
                  rightSlot={<CalendarIcon className="shrink-0" />}
                  inputBgClassName="cursor-pointer"
                  inputClassName="cursor-pointer"
                />
              )}
              optionComponent={
                <div className="p-3">
                  <Calendar
                    onSelect={(date: string) => onAddingSelect('date', date)}
                  />
                </div>
              }
              onSelect={() => {}}
              value={addingSlot.date}
              listArray="center"
              listType="simple"
              listSize="sm"
              fullWidth
            />
          </div>

          <div className="flex flex-1 items-end gap-3.5">
            <div className="flex items-end gap-2.5">
              <div className="flex flex-col gap-2 sm:gap-2.5">
                <label
                  htmlFor="startTime"
                  className="text-14-m sm:text-16-m hidden sm:flex"
                >
                  시작 시간
                </label>
                <InputDropdown
                  id="startTime"
                  options={TIME_SLOTS}
                  value={addingSlot.startTime}
                  placeholder="00:00"
                  onSelect={(option) => onAddingSelect('startTime', option)}
                  listArray="center"
                  inputClassName="sm:min-w-30"
                  scrollbarHidden
                />
              </div>
              <div className="bg-gray800 mb-[27px] h-0.5 w-2" />
              <div className="flex flex-col gap-2 sm:gap-2.5">
                <label
                  htmlFor="endTime"
                  className="text-14-m sm:text-16-m hidden sm:flex"
                >
                  종료 시간
                </label>
                <InputDropdown
                  id="endTime"
                  options={TIME_SLOTS}
                  value={addingSlot.endTime}
                  placeholder="00:00"
                  onSelect={(option) => onAddingSelect('endTime', option)}
                  listArray="center"
                  inputClassName="sm:min-w-30"
                  scrollbarHidden
                />
              </div>
            </div>

            <button
              type="button"
              onClick={onAdd}
              className="bg-primary500 mb-[13px] flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white sm:mb-1.5 sm:h-10.5 sm:w-10.5"
            >
              <Plus className="h-4 w-4 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>
      </div>

      {savedSchedules.length > 0 && (
        <div className="border-gray100 w-full border-t" />
      )}

      {savedSchedules.map((slot, idx) => (
        <div
          key={`${slot.id}-${idx}`}
          className="flex flex-col gap-2.5 sm:flex-row sm:gap-3.5"
        >
          <div className="flex flex-1">
            <Dropdown
              dropdownButton={() => (
                <Input
                  readOnly
                  value={slot.date}
                  inputBgClassName="cursor-pointer"
                  inputClassName="cursor-pointer"
                />
              )}
              optionComponent={
                <div className="p-3">
                  <Calendar
                    onSelect={(date) =>
                      onSavedSelect({ idx, field: 'date', value: date })
                    }
                  />
                </div>
              }
              onSelect={() => {}}
              value={slot.date}
              listArray="center"
              listType="simple"
              listSize="sm"
              fullWidth
            />
          </div>

          <div className="flex flex-1 items-end gap-3.5">
            <div className="flex items-end gap-2.5">
              <InputDropdown
                id="startTime"
                placeholder="00:00"
                value={slot.startTime}
                options={TIME_SLOTS}
                onSelect={(option) =>
                  onSavedSelect({ idx, field: 'startTime', value: option })
                }
                listArray="center"
                inputClassName="sm:min-w-30"
                scrollbarHidden
              />
              <div className="bg-gray800 mb-[27px] h-0.5 w-2" />
              <InputDropdown
                id="endTime"
                placeholder="00:00"
                value={slot.endTime}
                options={TIME_SLOTS}
                onSelect={(option) =>
                  onSavedSelect({ idx, field: 'endTime', value: option })
                }
                listArray="center"
                inputClassName="sm:min-w-30"
                scrollbarHidden
              />
            </div>

            <button
              type="button"
              onClick={() => onDelete(idx)}
              className="bg-gray50 mb-[13px] flex h-7 w-7 shrink-0 items-center justify-center rounded-full sm:mb-1.5 sm:h-10.5 sm:w-10.5"
            >
              <Minus className="h-4 w-4 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>
      ))}

      <AlertModal
        modalId="schedule-fill"
        headerText="날짜와 시간을 모두 선택해주세요."
        confirmText="확인"
        confirmFunction={() => close('schedule-fill')}
      />
      <AlertModal
        modalId={timeErrorModal?.modalId ?? ''}
        headerText={timeErrorModal?.modalMessage}
        confirmText="확인"
        confirmFunction={() => close(timeErrorModal?.modalId ?? '')}
      />
    </div>
  );
}
