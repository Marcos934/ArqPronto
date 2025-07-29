import { addDays, isAfter, isBefore, parseISO } from 'date-fns';

export const calculatePromotionalPrice = (originalPrice: number, discountPercentage: number = 20) => {
  return originalPrice * (1 - discountPercentage / 100);
};

export const isPromotionValid = (startDate: string | null, endDate: string | null): boolean => {
  if (!startDate || !endDate) return true; // If no dates set, promotion is valid
  
  const now = new Date();
  const start = parseISO(startDate);
  const end = parseISO(endDate);

  return isAfter(end, start) && isAfter(end, now);
};

export const getDefaultPromotionDates = () => {
  const start = new Date();
  const end = addDays(start, 30);

  return {
    start: start.toISOString(),
    end: end.toISOString()
  };
};

export const isPromotionActive = (
  promocaoAtiva: boolean,
  promocaoInicio: string | null,
  promocaoFim: string | null
): boolean => {
  if (!promocaoAtiva) return false;
  if (!promocaoInicio || !promocaoFim) return true; // If no dates set but promotion is active, return true
  
  const now = new Date();
  const start = parseISO(promocaoInicio);
  const end = parseISO(promocaoFim);

  return isAfter(now, start) && isBefore(now, end);
};