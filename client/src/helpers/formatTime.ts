export const formatTime = (milliseconds: number): string => {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  const centiseconds = Math.floor((milliseconds % 1000) / 10);

  return minutes > 0
    ? `${minutes}:${String(seconds).padStart(2, "0")}.${String(
        centiseconds
      ).padStart(2, "0")}`
    : `${seconds}.${String(centiseconds).padStart(2, "0")}`;
};
