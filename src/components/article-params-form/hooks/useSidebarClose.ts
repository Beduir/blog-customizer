import { useEffect } from 'react';

import type { RefObject } from 'react';

type UseSidebarClose = {
  panelRef: RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  onClose: () => void;
};

export const useSidebarClose = ({
  panelRef,
  isOpen,
  onClose,
}: UseSidebarClose): void => {
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: MouseEvent): void => {
      if (
        event.target instanceof Node &&
        panelRef.current &&
        !panelRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);

    return (): void => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [panelRef, isOpen, onClose]);
};
