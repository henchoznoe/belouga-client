export const formatDate = (date: string) => {
  // Format the date (YYYY-MM-DD HH:MM:SS) to a french date (DD.MM.AA HH:MM)
  const [datePart, timePart] = date.split(" ");
  const [year, month, day] = datePart.split("-");
  const [hours, minutes] = timePart.split(":");
  return `${day}.${month}.${year.slice(2)} ${hours}:${minutes}`;
}
