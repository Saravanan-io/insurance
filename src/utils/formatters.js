/**
 * Format number into Indian currency style (e.g., 2500000 -> "₹ 25,00,000")
 */
export const formatIndianCurrency = (value) => {
  if (value === null || value === undefined || value === '' || isNaN(value)) {
    return '₹ 0';
  }

  const num = Number(value);
  if (num === 0) return '₹ 0';

  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0
  }).format(num);

  return `₹ ${formatted}`;
};

/**
 * Format number into standard ASCII currency for reliable PDF font rendering (e.g. "Rs. 25,00,000")
 */
export const formatPdfCurrency = (value) => {
  if (value === null || value === undefined || value === '' || isNaN(value)) {
    return 'Rs. 0';
  }

  const num = Number(value);
  if (num === 0) return 'Rs. 0';

  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0
  }).format(num);

  return `Rs. ${formatted}`;
};

/**
 * Format number into readable Indian words representation (e.g. "25 Lakhs", "1.5 Crores")
 */
export const formatCurrencyInWords = (value) => {
  const num = Number(value);
  if (!num || isNaN(num) || num <= 0) return '';

  if (num >= 10000000) {
    const cr = num / 10000000;
    return `(${cr % 1 === 0 ? cr : cr.toFixed(2)} Crore${cr > 1 ? 's' : ''})`;
  } else if (num >= 100000) {
    const lakh = num / 100000;
    return `(${lakh % 1 === 0 ? lakh : lakh.toFixed(2)} Lakh${lakh > 1 ? 's' : ''})`;
  } else if (num >= 1000) {
    const k = num / 1000;
    return `(${k % 1 === 0 ? k : k.toFixed(1)} Thousand)`;
  }
  return '';
};

/**
 * Format Date to readable string (e.g. "13 Nov 2026")
 */
export const formatDate = (date = new Date()) => {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date);
};

/**
 * Generate a unique verification document reference
 */
export const generateDocumentId = (prefix = 'EMI') => {
  const random = Math.floor(100000 + Math.random() * 900000);
  const year = new Date().getFullYear();
  return `${prefix}-${year}-${random}`;
};
