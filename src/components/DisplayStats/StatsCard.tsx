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
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: scalaDownDependingOnDevice(10),
      }}
    >
      <Text
        style={{
          textAlign: "center",
          color: colors.text,
          fontFamily: typography.primaryMediumFont,
          fontSize: scalaDownDependingOnDevice(18),
        }}
      >
        {label}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          // backgroundColor: "#F2F2F2",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: colors.text,
            fontFamily: typography.primaryMediumFont,
            fontSize: scalaDownDependingOnDevice(18),
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
