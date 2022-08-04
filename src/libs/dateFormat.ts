export const dateFormate = (date?: Date) => {
  const dateString = new Date(String(date)).toLocaleDateString("ko");
  return dateString;
};
