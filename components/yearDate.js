export const YearDate = ({year}) => {
  const now = new Date().getFullYear();
  const birth = new Date(year).getFullYear();
  return <>{now - birth || 9}</>;
}
