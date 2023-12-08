const leftOrRightMargin = (index: number): "left" | "right" => {
  const direction = index % 10 < 5 ? "left" : "right";
  return direction;
};

export default leftOrRightMargin;
