import { useEffect, useState } from 'react';

export const useDebounce = (value: string, dealy = 300) => {
  const [valueState, setValueState] = useState<string>(value);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setValueState(value);
    }, dealy);
    return () => {
      clearTimeout(timeout);
    };
  }, [value, dealy]);
  return valueState;
};
