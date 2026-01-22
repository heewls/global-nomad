import Modal from '../common/modal';
import Button from '../common/button';
import { AlertModalProps } from './type';

export default function AlertModal({
  modalId,
  headerText,
  confirmText,
  confirmFunction,
}: AlertModalProps) {
  return (
    <Modal.Layer id={modalId}>
      <Modal.Container className="gap-6 px-17.5 py-7.5 sm:px-22.5 sm:py-7.5 sm:pt-10 sm:pb-7.5">
        <Modal.Header>{headerText}</Modal.Header>
        <Modal.Footer>
          <Button
            variant="primary"
            height="40-48"
            rounded="12-14"
            fontSize="14-16-m"
            className="w-45 sm:w-50"
            onClick={confirmFunction}
          >
            {confirmText}
          </Button>
        </Modal.Footer>
      </Modal.Container>
    </Modal.Layer>
  );
}
