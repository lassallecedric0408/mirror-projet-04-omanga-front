export const removeAccents = (research: string): string =>
  research
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
