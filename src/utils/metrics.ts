import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const device = {
  width,
  height,
};

// Define base dimensions for a "larger" reference device (iPhone 12 Pro)
const BASE_LARGER_WIDTH = 320;
const BASE_LARGER_HEIGHT = 626;

const scalaDownDependingOnDevice = (size: number): number => {
  const screenAspectRatio = width / height;

  // Calculate the aspect ratio of the base size
  const baseAspectRatio = BASE_LARGER_WIDTH / BASE_LARGER_HEIGHT;

  // Determine the adjustment factor based on the aspect ratios
  const adjustmentFactor = baseAspectRatio / screenAspectRatio;

  // Adjust the size based on the screen size
  const adjustedSize = size * adjustmentFactor;

  return adjustedSize;
};

export { device, scalaDownDependingOnDevice };
