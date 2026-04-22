export const addThousandsSeparator = (num) => {
  if (num === null || num === undefined) return "";
  const [integer, decimal] = num.toString().split(".");
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decimal !== undefined
    ? `${formattedInteger}.${decimal}`
    : formattedInteger;
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

export const prepareLineChartData = (transactions = []) => {
  const grouped = {};

  transactions.forEach((transaction) => {
    const { date, amount } = transaction;
    if (!date) return;

    if (!grouped[date]) {
      grouped[date] = { date, totalAmount: 0, items: [] };
    }
    grouped[date].totalAmount += amount;
    grouped[date].items.push(transaction);
  });

  return Object.values(grouped)
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((entry) => ({
      ...entry,
      month: new Date(entry.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      }),
    }));
};
