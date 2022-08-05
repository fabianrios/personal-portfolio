export const YearDate = ({year}) => {
  const [month, day, year] = year.split('-');
  const now = new Date().getFullYear();
  const birth = new Date(+year, +month - 1, +day).getFullYear();
  return now - birth || null;
}
