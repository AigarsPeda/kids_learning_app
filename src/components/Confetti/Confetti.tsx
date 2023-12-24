import { View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { device } from "utils/metrics";

const Confetti = () => {
  return (
    <View
      style={{
        width: device.width,
      }}
    >
      <ConfettiCannon
        count={200}
        fadeOut={true}
        fallSpeed={2500}
        // explosionSpeed={1000}
        autoStartDelay={100}
        origin={{ x: device.width / 2, y: -20 }}
        onAnimationEnd={() => {
          console.log("animation ended");
        }}
      />
    </View>
  );
};

export default Confetti;
