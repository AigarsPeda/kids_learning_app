const getMinHoursPassed = (startTimer: Date | null) => {
  if (!startTimer) {
    return;
  }

  const now = new Date();
  const diff = now.getTime() - startTimer.getTime();
  const min = Math.floor(diff / 60000);
  const seconds = Math.floor((diff - min * 60000) / 1000);

  const minStr = min < 10 ? `0${min}` : `${min}`;
  const secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return `${minStr}:${secondsStr}`;
};

export default getMinHoursPassed;
