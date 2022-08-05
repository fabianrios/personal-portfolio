export const YearDate = ({year}) => {
  const [month, day, y] = year.split('-');
  const now = new Date().getFullYear();
  const birth = new Date(+y, +month - 1, +day).getFullYear();
  return now - birth || null;
}
