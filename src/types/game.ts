export type GameLevelType = {
  [key: string]: {
    // step in witch user is
    levelStep: number;
    // how many times user has completed all steps
    levelProgress: number;
  };
};

export type UserSettingsType = {
  [key: string]: {
    lives: number;
    lastUpdate: Date;
  };
};
