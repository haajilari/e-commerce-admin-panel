// src/utils/formatters.ts
/**
 * Formats a number as a currency string.
 * @param amount The number to format.
 * @param currencySymbol The currency symbol (e.g., '$', '€'). Default is '$'.
 * @param locale Locale for number formatting (e.g., 'en-US'). Default is 'en-US'.
 * @returns A formatted currency string.
 */
export const formatCurrency = (
  amount: number,
  currencySymbol: string = '$',
  locale: string = 'en-US'
): string => {
  const formattedAmount = amount.toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return `<span class="math-inline">\{currencySymbol\}</span>{formattedAmount}`
}
