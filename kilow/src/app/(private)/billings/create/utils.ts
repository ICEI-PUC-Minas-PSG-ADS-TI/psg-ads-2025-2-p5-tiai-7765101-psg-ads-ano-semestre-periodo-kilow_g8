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

export const months = [
  { optionName: 'Janeiro', optionValue: '01 (Jan.)' },
  { optionName: 'Fevereiro', optionValue: '02 (Fev.)' },
  { optionName: 'Março', optionValue: '03 (Mar.)' },
  { optionName: 'Abril', optionValue: '04 (Abr.)' },
  { optionName: 'Maio', optionValue: '05 (Mai.)' },
  { optionName: 'Junho', optionValue: '06 (Jun.)' },
  { optionName: 'Julho', optionValue: '07 (Jul.)' },
  { optionName: 'Agosto', optionValue: '08 (Ago.)' },
  { optionName: 'Setembro', optionValue: '09 (Set.)' },
  { optionName: 'Outubro', optionValue: '10 (Out.)' },
  { optionName: 'Novembro', optionValue: '11 (Nov.)' },
  { optionName: 'Dezembro', optionValue: '12 (Dez.)' },
];
