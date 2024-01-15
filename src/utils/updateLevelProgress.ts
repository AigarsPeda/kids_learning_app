import { LEVEL_SETTINGS } from "hardcoded";
import { type LevelType } from "types/game";
import deepCopyObject from "utils/deepCopyObject";

const { levelParts } = LEVEL_SETTINGS;

const updateLevelProgress = (lvl: LevelType): LevelType => {
  const step = lvl.levelStep;
  const s = step === levelParts ? 0 : step + 1;
  const isAlreadyCompleted = lvl?.isLevelCompleted;

  const d = deepCopyObject(lvl);

  console.log("updateLevelProgress", step, levelParts);
  console.log(">>>>>>", lvl);
  console.log("222222", step === levelParts);

  return {
    ...d,
    levelStep: s,
    isLevelCompleted: isAlreadyCompleted || s === levelParts, // if already completed, keep it completed
  };
};

export default updateLevelProgress;
