export const formatTime = (milliseconds: number): string => {
  if (isNaN(milliseconds)) {
    return "DNF";
  }
  const seconds = milliseconds / 1000;
  return seconds.toFixed(2); // Adjust to 2 decimal places for seconds
};
