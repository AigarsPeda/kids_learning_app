import TextOrInputDisplay from "components/TextOrInputDisplay/TextOrInputDisplay";
import useColors from "hooks/useColors";
import {
  useEffect,
  useRef,
  useState,
  type FC,
  RefObject,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Keyboard, StyleSheet, Text, TextInput, View } from "react-native";
import {
  type EquationArgumentType,
  type MissingNumberTaskType,
} from "types/addition";
import { type AnswerType } from "types/common";
import isMissingNumberAnswerCorrect from "utils/isMissingNumberAnswerCorrect";

const inputAccessoryViewID1 = "input-ID1";
const inputAccessoryViewID2 = "input-ID2";
const inputAccessoryViewID3 = "input-ID3";

interface DisplayUnknownNumberAdditionProps {
  sequenceNumber: number;
  // handlePress: () => void;
  task: MissingNumberTaskType;
}

// type NoUndefinedEquationArgumentType = NonNullable<EquationArgumentType>;

// const DisplayUnknownNumberAddition: FC<DisplayUnknownNumberAdditionProps> = ({
//   task,
//   sequenceNumber,
// }) => {
//   const { colors } = useColors();
//   const inputRef1 = useRef<TextInput>(null);
//   const inputRef2 = useRef<TextInput>(null);
//   const inputRef3 = useRef<TextInput>(null);
//   const [answer, setAnswer] = useState<AnswerType>("unknown");
//   const [text, setText] = useState<EquationArgumentType>({
//     a: task.data.a,
//     b: task.data.b,
//     result: task.data.result,
//   });

//   const handlePress = (ref: RefObject<TextInput>) => {
//     if (ref.current) {
//       ref.current.focus();

//       // Keyboard.dismiss();
//     }
//   };

//   useEffect(() => {
//     setAnswer(isMissingNumberAnswerCorrect(text));
//   }, [text]);

//   useEffect(() => {
//     if (sequenceNumber === 0) {
//       console.log("inputRef.current.focus()");
//       inputRef1.current?.focus();
//       inputRef2.current?.focus();
//       inputRef3.current?.focus();
//     }
//   }, []);

//   return (
//     <View style={styles.container}>
//       <View style={styles.taskContainer}>
//         <TextOrInputDisplay
//           handlePress={() => handlePress(inputRef1)}
//           ref={inputRef1}
//           answer={answer}
//           text={task.data.a}
//           inputNumber={text.a}
//           inputAccessoryViewID={inputAccessoryViewID1}
//           setInputNumber={(str) => setText((state) => ({ ...state, a: str }))}
//         />
//         <View style={styles.textContainer}>
//           <Text
//             style={{
//               ...styles.text,
//               color: colors.text,
//             }}
//           >
//             +
//           </Text>
//         </View>
//         <TextOrInputDisplay
//           answer={answer}
//           ref={inputRef2}
//           text={task.data.b}
//           inputNumber={text.b}
//           handlePress={() => handlePress(inputRef2)}
//           inputAccessoryViewID={inputAccessoryViewID2}
//           setInputNumber={(str) => setText((state) => ({ ...state, b: str }))}
//         />
//         <View style={styles.textContainer}>
//           <Text
//             style={{
//               ...styles.text,
//               color: colors.text,
//             }}
//           >
//             =
//           </Text>
//         </View>
//         <TextOrInputDisplay
//           answer={answer}
//           ref={inputRef3}
//           text={task.data.result}
//           inputNumber={text.result}
//           handlePress={() => handlePress(inputRef3)}
//           inputAccessoryViewID={inputAccessoryViewID3}
//           setInputNumber={(str) =>
//             setText((state) => ({ ...state, result: str }))
//           }
//         />
//       </View>
//     </View>
//   );
// };

// type Ref = TextInput | null;
type Ref = { focus: () => void } | null;

const DisplayUnknownNumberAddition = forwardRef<
  Ref,
  DisplayUnknownNumberAdditionProps
>(({ task, sequenceNumber }, ref) => {
  const { colors } = useColors();
  const inputRef = useRef<TextInput>(null);
  const [answer, setAnswer] = useState<AnswerType>("unknown");
  const [text, setText] = useState<EquationArgumentType>({
    a: task.data.a,
    b: task.data.b,
    result: task.data.result,
  });

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    // ... other methods or properties you want to expose
  }));

  useEffect(() => {
    sequenceNumber === 0 && inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setAnswer(isMissingNumberAnswerCorrect(text));
  }, [text]);

  return (
    <View style={styles.container}>
      <View style={styles.taskContainer}>
        <TextOrInputDisplay
          ref={inputRef}
          answer={answer}
          text={task.data.a}
          inputNumber={text.a}
          // handlePress={handlePress}
          inputAccessoryViewID={inputAccessoryViewID1}
          setInputNumber={(str) => setText((state) => ({ ...state, a: str }))}
        />
        <View style={styles.textContainer}>
          <Text
            style={{
              ...styles.text,
              color: colors.text,
            }}
          >
            +
          </Text>
        </View>
        <TextOrInputDisplay
          ref={inputRef}
          answer={answer}
          text={task.data.b}
          inputNumber={text.b}
          inputAccessoryViewID={inputAccessoryViewID2}
          setInputNumber={(str) => setText((state) => ({ ...state, b: str }))}
        />
        <View style={styles.textContainer}>
          <Text
            style={{
              ...styles.text,
              color: colors.text,
            }}
          >
            =
          </Text>
        </View>
        <TextOrInputDisplay
          answer={answer}
          ref={inputRef}
          text={task.data.result}
          inputNumber={text.result}
          inputAccessoryViewID={inputAccessoryViewID3}
          setInputNumber={(str) =>
            setText((state) => ({ ...state, result: str }))
          }
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  taskContainer: {
    gap: 3,
    margin: 10,
    width: "auto",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContainer: {
    width: 30,
    height: 30,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default DisplayUnknownNumberAddition;
