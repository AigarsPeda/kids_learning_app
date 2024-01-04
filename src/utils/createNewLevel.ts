import { LEVEL_SETTINGS } from "hardcoded";

const createNewLevel = (lvl: number) => {
  const { defaultLevelExperience } = LEVEL_SETTINGS;
  return {
    [lvl.toString()]: {
      levelStep: 0,
      isLevelCompleted: false,
      experienceInLevel: defaultLevelExperience,
    },
  };
};

export default createNewLevel;
