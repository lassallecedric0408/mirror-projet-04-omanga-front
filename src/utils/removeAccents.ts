export const removeAccents = (research: string): string => {
  return research
    .toLocaleUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};
