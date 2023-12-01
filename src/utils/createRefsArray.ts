import { RefObject, createRef } from "react";

interface CreateRefsArrayArgs<T> {
  length: number;
  refs: React.MutableRefObject<RefObject<T>[]>;
}

const createRefsArray = <T>({ length, refs }: CreateRefsArrayArgs<T>) => {
  return Array.from({ length }, (_, i) => refs.current[i] || createRef<T>());
};

export default createRefsArray;
