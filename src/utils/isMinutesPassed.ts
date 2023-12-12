type IsMinutesPassedArgs = {
  startDate: Date;
  minutes: number;
};

const isMinutesPassed = ({ startDate, minutes }: IsMinutesPassedArgs) => {
  // Get the current date
  const today = new Date();

  // Calculate the absolute time difference in milliseconds
  const diffTime = Math.abs(today.getTime() - new Date(startDate).getTime());

  // Convert the time difference to minutes and round up to the nearest whole number
  const diffMinutes = Math.ceil(diffTime / (1000 * 60));

  // Log the calculated difference in minutes (for debugging purposes)
  console.log("diffMinutes", diffMinutes);

  // Return true if the difference in minutes is greater than or equal to the specified minutes
  return diffMinutes >= minutes;
};

export default isMinutesPassed;
