const leftOrRightMargin = (
  index: number,
  brakePoint: number
): "left" | "right" => {
  const direction = index % 10 < brakePoint ? "left" : "right";
  return direction;
};

export default leftOrRightMargin;
