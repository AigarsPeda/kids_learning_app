const getTimePassedSince = (startDate: Date, endTimeInMinutes: number) => {
  const now = new Date();
  const lastUpdate = new Date(startDate);

  const timeTillNextLife =
    endTimeInMinutes * 60 -
    Math.floor((now.getTime() - lastUpdate.getTime()) / 1000);

  if (timeTillNextLife <= 0) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      timeTillNextLife: 0,
    };
  }

  const hours = Math.floor(timeTillNextLife / 3600);
  const minutes = Math.floor(timeTillNextLife / 60);
  const seconds = timeTillNextLife - minutes * 60;

  return {
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    timeTillNextLife: timeTillNextLife,
  };
};

export default getTimePassedSince;
