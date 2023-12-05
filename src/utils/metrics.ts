import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const device = {
  width,
  height,
};

// Define base dimensions for a "larger" reference device (iPhone 15 Pro)
const BASE_LARGER_WIDTH = 320;
const BASE_LARGER_HEIGHT = 780;

const scalaDownDependingOnDevice = (size: number) => {
  // Calculate scale factors
  const widthScaleFactor = width / BASE_LARGER_WIDTH;
  const heightScaleFactor = height / BASE_LARGER_HEIGHT;

  // Use the smaller of the two scale factors to ensure the content fits on the screen
  const scaleFactor =
    Math.ceil(Math.min(widthScaleFactor, heightScaleFactor) * 100) / 100;

  // Scale down the size; scaleFactor will be less than 1 for smaller devices
  return size * scaleFactor;
};

export { device, scalaDownDependingOnDevice };
