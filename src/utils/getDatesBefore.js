import { formatDate } from "./formatDate";

export const getDateNDaysBefore = (daysBefore) => {
    const today = new Date();
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() - daysBefore);
    return formatDate(targetDate);
  };