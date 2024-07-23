export const isNumber = (str: any): boolean => {
  const num = parseFloat(str);
  return !isNaN(num);
};
