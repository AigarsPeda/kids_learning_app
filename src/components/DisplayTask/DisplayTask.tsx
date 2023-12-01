import DisplayUnknownNumberAddition from "components/DisplayUnknownNumberAddition/DisplayUnknownNumberAddition";
import { FC, RefObject, useRef } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { MissingNumberTaskType, TaskKindType } from "types/addition";
import createRefsArray from "utils/createRefsArray";

interface DisplayTaskProps {
  kind: TaskKindType;
  tasks: MissingNumberTaskType[];
}

const DisplayTask: FC<DisplayTaskProps> = ({ kind, tasks }) => {
  const taskRefs = useRef<RefObject<TextInput>[]>([]);

  if (kind === "missingNumber") {
    return (
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => {
          const taskRef = createRefsArray<TextInput>({
            refs: taskRefs,
            length: tasks.length,
          });

          return (
            <DisplayUnknownNumberAddition
              task={item}
              ref={taskRef[index]}
              sequenceNumber={index}
            />
          );
        }}
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
