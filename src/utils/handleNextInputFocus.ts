import { MutableRefObject, RefObject } from "react";
import { TextInput } from "react-native";

const handleNextInputFocus = (
  taskRefs: MutableRefObject<RefObject<TextInput>[]>
) => {
  for (let i = 0; i < taskRefs.current.length; i++) {
    const input = taskRefs.current[i];
    const nextInput = taskRefs.current[i + 1];
    if (input.current?.isFocused() && nextInput) {
      nextInput.current?.focus();
      break;
    }
  }
};

export default handleNextInputFocus;
