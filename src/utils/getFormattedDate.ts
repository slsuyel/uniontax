export const getFormattedDate = (
  dateString: string | number | Date | null
): string | null => {
  if (!dateString) return null;
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};
