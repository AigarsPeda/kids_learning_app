import { LEVEL_SETTINGS } from "hardcoded";
import { type LevelType } from "types/game";

const { experienceCostForMistake } = LEVEL_SETTINGS;

const removeExperienceFromLevel = (lvl: LevelType) => {
  const newExperience = lvl.experienceInLevel - experienceCostForMistake;

  return {
    ...lvl,
    experienceInLevel: newExperience,
  };
};

export default removeExperienceFromLevel;
