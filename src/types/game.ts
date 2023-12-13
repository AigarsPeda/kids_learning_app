export type GameLevelType = {
  [key: string]: {
    // step in witch user is
    levelStep: number; // In LEVEL_SETTINGS.levelParts is completed add 1 to levelProgress
    // how many times user has completed all steps
    // levelProgress: number;
    isLevelCompleted: boolean;
  };
};

export type UserSettingsType = {
  [key: string]: {
    lives: number;
    lastUpdate: Date;
  };
};
