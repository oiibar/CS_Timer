export const formatDate = (date: string): string => {
  const formattedDate = new Date(date);
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const datePart = formattedDate.toLocaleDateString("en-US", dateOptions);
  const timePart = formattedDate.toLocaleTimeString("en-US", timeOptions);

  return `${datePart} ${timePart}`;
};
