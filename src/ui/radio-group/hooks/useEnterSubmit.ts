import { useEffect } from 'react';

import type { RefObject } from 'react';
import type { OptionType } from 'src/constants/articleProps';

type UseEnterSubmit = {
  onChange?: (option: OptionType) => void;
  option: OptionType;
  optionRef: RefObject<HTMLDivElement | null>;
};

export const useEnterSubmit = ({
  onChange,
  option,
  optionRef,
}: UseEnterSubmit): void => {
  useEffect(() => {
    const optionHtml = optionRef.current;

    if (!optionHtml) return;

    const handleEnterKeyDown = (event: KeyboardEvent): void => {
      if (document.activeElement === optionHtml && event.key === 'Enter') {
        event.preventDefault();
        onChange?.(option);
      }
    };

    optionHtml.addEventListener('keydown', handleEnterKeyDown);

    return (): void => {
      optionHtml.removeEventListener('keydown', handleEnterKeyDown);
    };
  }, [onChange, option, optionRef]);
};
