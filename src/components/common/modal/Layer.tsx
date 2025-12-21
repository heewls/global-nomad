'use client';

import { createPortal } from 'react-dom';
import useModalStore from '@/store/modal';

export default function Layer({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const isOpen = useModalStore((s) => s.modalId.includes(id));

  if (typeof window === 'undefined' || !isOpen) return null;

  const element = document.getElementById('modal-root');
  if (!element) return null;

  return createPortal(<>{children}</>, element);
}
