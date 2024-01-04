import { LEVEL_SETTINGS } from "hardcoded";
import { type LevelType } from "types/game";

const { experienceCostForMistake } = LEVEL_SETTINGS;

const removeExperienceFromLevel = (key: number, lvl: LevelType) => {
  const newExperience = lvl.experienceInLevel - experienceCostForMistake;

  return {
    [key.toString()]: {
      ...lvl,
      experienceInLevel: newExperience,
    },
  };
};

export default removeExperienceFromLevel;
