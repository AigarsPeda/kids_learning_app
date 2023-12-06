import { createRef, type MutableRefObject, type RefObject } from "react";

interface CreateRefsArrayArgs<T> {
  length: number;
  refs: MutableRefObject<RefObject<T>[]>;
}

const createRefsArray = <T>({ length, refs }: CreateRefsArrayArgs<T>) => {
  return Array.from({ length }, (_, i) => refs.current[i] || createRef<T>());
};

export default createRefsArray;
