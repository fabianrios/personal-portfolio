export const YearDate = ({year}) => {
  const [month, day, y] = year.split('-');
  const birthDate = new Date(+y, +month - 1, +day);
  const now = new Date();
  
  let age = now.getFullYear() - birthDate.getFullYear();
  
  if (now < new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate())) {
    age--;
  }
  
  return age || null;
}
