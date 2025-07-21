export const toCurrency = (
  amount: number | string | bigint,
  notation: "standard" | "scientific" | "engineering" | "compact" = "standard"
): string => {
  const parsed = typeof amount === "bigint" ? Number(amount) : Number(amount);

  if (isNaN(parsed)) return "0";

  return new Intl.NumberFormat("en-US", {
    notation,
    maximumFractionDigits: 8,
  }).format(parsed);
};
