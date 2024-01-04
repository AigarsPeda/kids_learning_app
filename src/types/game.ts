export type LevelType = {
  levelStep: number; // In LEVEL_SETTINGS.levelParts is completed add 1 to levelProgress
  isLevelCompleted: boolean;
  experienceInLevel: number;
};

export type GameLevelType = {
  [key: string]: LevelType;
};

export type UserSettingsType = {
  [key: string]: {
    lives: {
      lives: number;
      lastUpdate: Date;
    };
    experience: number;
  };
};
