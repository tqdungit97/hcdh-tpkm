export const formatNumber = (input: string | number) =>
  Number(input).toFixed(2).replace(".00", "");
