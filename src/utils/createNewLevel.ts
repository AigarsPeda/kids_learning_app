import { LEVEL_SETTINGS } from "hardcoded";

const createNewLevel = () => {
  const { defaultLevelExperience } = LEVEL_SETTINGS;
  return {
    levelStep: 0,
    isLevelCompleted: false,
    experienceInLevel: defaultLevelExperience,
  };
};

export default createNewLevel;
