type IsHoursPassesArgs = {
  startDate: Date;
  hours: number;
};

const isHoursPassed = ({ startDate, hours }: IsHoursPassesArgs) => {
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - new Date(startDate).getTime());

  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));

  console.log("diffHours", diffHours);

  return diffHours >= hours;
};

export default isHoursPassed;
