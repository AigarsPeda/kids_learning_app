import TextOrInputDisplay from "components/TextOrInputDisplay/TextOrInputDisplay";
import useColors from "hooks/useColors";
import { useEffect, useState, type FC, useRef, forwardRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
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
  task: MissingNumberTaskType;
  // handlePress: () => void;
}

// type NoUndefinedEquationArgumentType = NonNullable<EquationArgumentType>;

const DisplayUnknownNumberAddition: FC<DisplayUnknownNumberAdditionProps> = ({
  task,
  sequenceNumber,
}) => {
  const { colors } = useColors();
  const inputRef = useRef<TextInput>(null);
  const viewRef = useRef<View>(null);
  const [answer, setAnswer] = useState<AnswerType>("unknown");
  const [text, setText] = useState<EquationArgumentType>({
    a: task.data.a,
    b: task.data.b,
    result: task.data.result,
  });

  const handlePress = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    setAnswer(isMissingNumberAnswerCorrect(text));
  }, [text]);

  useEffect(() => {
    if (inputRef.current && sequenceNumber === 0) {
      console.log("inputRef.current.focus()");
      inputRef.current.focus();
    }
  }, []);

  return (
    <View style={styles.container} ref={viewRef}>
      <View style={styles.taskContainer}>
        <TextOrInputDisplay
          handlePress={handlePress}
          ref={inputRef}
          answer={answer}
          text={task.data.a}
          inputNumber={text.a}
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
          answer={answer}
          ref={inputRef}
          text={task.data.b}
          inputNumber={text.b}
          handlePress={handlePress}
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
          handlePress={handlePress}
          inputAccessoryViewID={inputAccessoryViewID3}
          setInputNumber={(str) =>
            setText((state) => ({ ...state, result: str }))
          }
        />
      </View>
    </View>
  );
};

// type Ref = TextInput;

// const DisplayUnknownNumberAddition = forwardRef<
//   Ref,
//   DisplayUnknownNumberAdditionProps
// >(({ task, sequenceNumber, handlePress }, ref) => {
//   const { colors } = useColors();
//   // const inputRef = useRef<TextInput>(null);
//   const [answer, setAnswer] = useState<AnswerType>("unknown");
//   const [text, setText] = useState<EquationArgumentType>({
//     a: task.data.a,
//     b: task.data.b,
//     result: task.data.result,
//   });

//   // const handlePress = () => {
//   //   if (inputRef.current) {
//   //     inputRef.current.focus();
//   //   }
//   // };

//   useEffect(() => {
//     setAnswer(isMissingNumberAnswerCorrect(text));
//   }, [text]);

//   // useEffect(() => {
//   //   if (inputRef.current && sequenceNumber === 0) {
//   //     console.log("inputRef.current.focus()");
//   //     inputRef.current.focus();
//   //   }
//   // }, []);

//   return (
//     <View style={styles.container}>
//       <View style={styles.taskContainer}>
//         <TextOrInputDisplay
//           ref={ref}
//           answer={answer}
//           text={task.data.a}
//           inputNumber={text.a}
//           handlePress={handlePress}
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
//           text={task.data.b}
//           inputNumber={text.b}
//           handlePress={handlePress}
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
//           text={task.data.result}
//           inputNumber={text.result}
//           handlePress={handlePress}
//           inputAccessoryViewID={inputAccessoryViewID3}
//           setInputNumber={(str) =>
//             setText((state) => ({ ...state, result: str }))
//           }
//         />
//       </View>
//     </View>
//   );
// });

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
