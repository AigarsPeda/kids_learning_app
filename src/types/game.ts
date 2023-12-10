export type GameLevelType = {
  [key: string]: {
    level?: number;
    // lives?: number;
    levelProgress?: number;
    // levelScore?: number;
  };
};

export type UserSettingsType = {
  [key: string]: {
    lives: number;
    // level?: number;
    // levelScore?: number;
    // levelProgress?: number;
  };
};
