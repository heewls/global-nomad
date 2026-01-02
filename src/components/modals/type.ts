import { MouseEventHandler } from 'react';

interface CustomModalProps {
  modalId: string;
  headerText: React.ReactNode;
  cancelText: string;
  confirmText: string;
  confirmFunction: MouseEventHandler<HTMLButtonElement>;
}

export type ConfirmModalProps = CustomModalProps;

export type AlertModalProps = Omit<CustomModalProps, 'cancelText'>;
