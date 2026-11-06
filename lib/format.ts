/** INR price formatting — Indian digit grouping, no decimals. */
export function inr(price: number): string {
  return "₹" + new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(price);
}

/** GST-inclusive split used in cart summary: prices shown are inclusive; we surface an indicative tax component. */
export function splitTax(total: number): { taxable: number; tax: number } {
  const taxable = Math.round(total / 1.03); // 3% GST on jewellery
  return { taxable, tax: total - taxable };
}
