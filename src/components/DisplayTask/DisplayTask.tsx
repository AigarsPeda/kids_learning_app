import DisplayUnknownNumberAddition from "components/DisplayUnknownNumberAddition/DisplayUnknownNumberAddition";
import { forwardRef, type FC } from "react";
import { Text, TextInput, View } from "react-native";
import { MissingNumberTaskType, TaskKindType } from "types/addition";

interface DisplayTaskProps {
  kind: TaskKindType;
  sequenceNumber: number;
  task: MissingNumberTaskType;
  // handlePress: () => void;
}

const DisplayTask: FC<DisplayTaskProps> = ({ task, kind, sequenceNumber }) => {
  if (kind === "missingNumber") {
    return (
      <DisplayUnknownNumberAddition
        task={task}
        sequenceNumber={sequenceNumber}
      />
    );
  }

  return (
    <View>
      <Text>Unknown task</Text>
    </View>
  );
};

export default DisplayTask;

// type Ref = TextInput;

// const DisplayTask = forwardRef<Ref, DisplayTaskProps>(
//   ({ kind, sequenceNumber, task, handlePress }, ref) => {
//     if (kind === "missingNumber") {
//       return (
//         <DisplayUnknownNumberAddition
//           task={task}
//           handlePress={handlePress}
//           sequenceNumber={sequenceNumber}
//         />
//       );
//     }

//     return (
//       <View>
//         <Text>Unknown task</Text>
//       </View>
//     );
//   }
// );

// export default DisplayTask;
