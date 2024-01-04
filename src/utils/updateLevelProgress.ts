import { LEVEL_SETTINGS } from "hardcoded";
import { type LevelType } from "types/game";

const { levelParts } = LEVEL_SETTINGS;

const updateLevelProgress = (lvl: LevelType) => {
  const step = lvl.levelStep;
  const s = step === levelParts ? 0 : step + 1;

  return {
    // [key.toString()]: {
    ...lvl,
    levelStep: s,
    isLevelCompleted: step === levelParts,
    // },
  };
};

export default updateLevelProgress;
