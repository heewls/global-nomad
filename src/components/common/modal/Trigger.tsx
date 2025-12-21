'use client';

import React, { cloneElement, isValidElement, ReactElement } from 'react';
import useModalStore from '@/store/modal';

interface TriggerProps {
  modalId: string;
  children: ReactElement<{ onClick?: React.MouseEventHandler<HTMLElement> }>;
}

export default function Trigger({ modalId, children }: TriggerProps) {
  const open = useModalStore((s) => s.open);

  if (!isValidElement(children)) {
    return null;
  }

  return cloneElement(children, {
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      children.props.onClick?.(e);
      open(modalId);
    },
  });
}
