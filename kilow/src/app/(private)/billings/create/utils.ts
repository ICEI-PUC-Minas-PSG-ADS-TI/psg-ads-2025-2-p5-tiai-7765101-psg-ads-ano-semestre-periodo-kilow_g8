export type registerType = 'manual' | 'ia';

interface IOption {
  registerType: registerType;
  tabLabel: string;
}

export const CreateBillingTabs: IOption[] = [
  {
    registerType: 'manual',
    tabLabel: '✏️ Preencher manualmente',
  },
  {
    registerType: 'ia',
    tabLabel: '📎 Foto  da fatura',
  },
];

export const AbbreviatedMonthName = {
  1: 'jan',
  2: 'fev',
  3: 'mar',
  4: 'abr',
  5: 'mai',
  6: 'jun',
  7: 'jul',
  8: 'ago',
  9: 'set',
  10: 'out',
  11: 'nov',
  12: 'dez',
} as const;

export const NameMonth = {
  1: 'Janeiro',
  2: 'Fevereiro',
  3: 'Março',
  4: 'Abril',
  5: 'Maio',
  6: 'Junho',
  7: 'Julho',
  8: 'Agosto',
  9: 'Setembro',
  10: 'Outubro',
  11: 'Novembro',
  12: 'Dezembro',
} as const;

export type MonthKey = keyof typeof AbbreviatedMonthName;

export const months = Object.entries(NameMonth).map(
  ([monthNumber, monthName]) => {
    const monthKey = Number(monthNumber) as MonthKey;

    const paddedMonthNumber = monthNumber.padStart(2, '0');

    const monthAbbreviation = AbbreviatedMonthName[monthKey];

    const formattedAbbr =
      monthAbbreviation.charAt(0).toUpperCase() +
      monthAbbreviation.slice(1) +
      '.';

    return {
      optionName: monthName,
      optionValue: `${paddedMonthNumber} (${formattedAbbr})`,
    };
  },
);

export const moneyFormat = (value: string | number) => {
  return `R$ ${value.toString().replaceAll('.', ',')}`;
};
