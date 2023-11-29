import DisplayUnknownNumberAddition from "components/DisplayUnknownNumberAddition/DisplayUnknownNumberAddition";
import { type FC } from "react";
import { Text, View } from "react-native";
import { MissingNumberTaskType, TaskKindType } from "types/addition";

interface DisplayTaskProps {
  kind: TaskKindType;
  task: MissingNumberTaskType;
}

const DisplayTask: FC<DisplayTaskProps> = ({ task, kind }) => {
  if (kind === "missingNumber") {
    return <DisplayUnknownNumberAddition task={task} />;
  }

  return (
    <View>
      <Text>Unknown task</Text>
    </View>
  );
};

export default DisplayTask;
