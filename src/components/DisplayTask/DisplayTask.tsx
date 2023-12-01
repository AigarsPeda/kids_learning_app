import DisplayUnknownNumberAddition from "components/DisplayUnknownNumberAddition/DisplayUnknownNumberAddition";
import { forwardRef } from "react";
import { Text, TextInput, View } from "react-native";
import { MissingNumberTaskType, TaskKindType } from "types/addition";

interface DisplayTaskProps {
  kind: TaskKindType;
  sequenceNumber: number;
  task: MissingNumberTaskType;
}

type Ref = TextInput | null;

const DisplayTask = forwardRef<Ref, DisplayTaskProps>(
  ({ kind, sequenceNumber, task }, ref) => {
    if (kind === "missingNumber") {
      return (
        <DisplayUnknownNumberAddition
          ref={ref}
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
  }
);

export default DisplayTask;
