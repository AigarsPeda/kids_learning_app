import { useEffect, useRef } from "react";

const usePreviousState = <T extends unknown>(value: T): T | undefined => {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export default usePreviousState;
