import Modal from '../common/modal';
import Button from '../common/button';
import Really from '@/assets/icons/really.svg';
import useModalStore from '@/store/modal';
import { ConfirmModalProps } from './type';

export default function ConfirmModal({
  modalId,
  headerText,
  cancelText,
  confirmText,
  confirmFunction,
}: ConfirmModalProps) {
  const { close } = useModalStore();

  return (
    <Modal.Layer id={modalId}>
      <Modal.Container className="gap-6 px-7.5 pt-7.5 pb-6 sm:px-15 sm:py-7.5">
        <Modal.Header
          image={<Really className="h-[49px] w-[49px] sm:h-22 sm:w-22" />}
        >
          {headerText}
        </Modal.Header>
        <Modal.Footer>
          <Button
            variant="outline"
            height="40-48"
            rounded="12-14"
            fontSize="14-16-b"
            onClick={() => close(modalId)}
          >
            {cancelText}
          </Button>
          <Button
            variant="primary"
            height="40-48"
            rounded="12-14"
            fontSize="14-16-m"
            onClick={confirmFunction}
          >
            {confirmText}
          </Button>
        </Modal.Footer>
      </Modal.Container>
    </Modal.Layer>
  );
}
