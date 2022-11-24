import { HTMLProps, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface SearchInputProps extends HTMLProps<HTMLInputElement> {
  debounceTime?: number;
  onValueChange?: (value: string) => void;
}

const DEBOUNCE_TIME = 500;

export const SearchInput = ({
  debounceTime = DEBOUNCE_TIME,
  onChange,
  onValueChange,
  ...rest
}: SearchInputProps) => {
  const handleOnChange = useCallback(
    (event) => {
      onValueChange?.(String(event?.target?.value));
      onChange?.(event);
    },
    [onChange, onValueChange]
  );

  const debouncedOnChange = useDebouncedCallback(handleOnChange, debounceTime);

  return (
    <input
      className="bg-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      data-testid="search-input"
      type="text"
      onChange={debouncedOnChange}
      {...rest}
    />
  );
};
