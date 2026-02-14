import Modal from '@/components/common/modal';
import ReservationForm from './ReservationForm';
import { ActivityDetail } from '@/types/activities';
import Plus from '@/assets/icons/plus.svg';
import Minus from '@/assets/icons/minus.svg';

export function Participant({
  headCount,
  handleCountChange,
  handleCount,
}: {
  headCount: number;
  handleCountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCount: (type: 'minus' | 'plus') => void;
}) {
  return (
    <div className="flex items-center justify-between gap-5 md:flex-col md:items-start lg:flex-row lg:items-center">
      <h3 className="text-16-b">참여 인원 수</h3>
      <div className="border-gray100 flex h-12 w-36 items-center justify-between rounded-xl border px-2.5 md:w-full lg:w-36">
        <button onClick={() => handleCount('minus')} className="p-2.5">
          <Minus className="text-gray950 h-5 w-5 cursor-pointer" />
        </button>
        <div className="flex h-10 w-10 items-center justify-center">
          <input
            id="headCount"
            type="number"
            min="1"
            value={headCount}
            onChange={handleCountChange}
            size={headCount.toString().length || 1}
            className="text-16-b w-full text-center focus:outline-none"
          />
        </div>
        <button onClick={() => handleCount('plus')} className="p-2.5">
          <Plus className="text-gray950 h-5 w-5 cursor-pointer" />
        </button>
      </div>
    </div>
  );
}

export function ReservationModal({ detail }: { detail: ActivityDetail }) {
  return (
    <Modal.Container
      containerClassName="h-fit w-full p-6 pb-4.5 md:px-7.5 md:pt-6 md:pb-4.5 rounded-b-none"
      placement="items-end lg:hidden"
    >
      <ReservationForm detail={detail} />
    </Modal.Container>
  );
}
