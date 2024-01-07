import useColors from "hooks/useStyles";
import { type FC, type ReactNode } from "react";
import { Text, View } from "react-native";
import { scalaDownDependingOnDevice } from "utils/metrics";

interface StatsCardProps {
  label: string;
  title: string;
  icon: ReactNode;
}

const StatsCard: FC<StatsCardProps> = ({ label, title, icon }) => {
  const { colors, typography } = useColors();
  return (
    <View
      style={{
        borderWidth: 2,
        display: "flex",
        borderRadius: 10,
        alignItems: "center",
        borderColor: colors.completed,
        justifyContent: "space-between",
        width: scalaDownDependingOnDevice(95),
        padding: scalaDownDependingOnDevice(10),
      }}
    >
      <Text
        style={{
          textAlign: "center",
          color: colors.text,
          fontFamily: typography.primaryMediumFont,
          fontSize: scalaDownDependingOnDevice(15),
          paddingBottom: scalaDownDependingOnDevice(10),
        }}
      >
        {label}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: colors.text,
            fontFamily: typography.primaryMediumFont,
            fontSize: scalaDownDependingOnDevice(22),
          }}
        >
          {title}
        </Text>
        {icon}
      </View>
    </View>
  );
};

export default StatsCard;
