'use client';

import {
  Container,
  AvatarBox,
  AvatarText,
  DeviceName,
  CategoryLabel,
  BadgesRow,
  Badge,
  CostLabel,
} from './style';

interface CardDeviceProps {
  name: string;
  category: string;
  power: number;       // em Watts
  hoursPerDay: number; // horas por dia
  daysPerWeek: number; // dias por semana (exibido como "X dias")
  costPerKwh?: number; // tarifa R$/kWh (padrão 0.75)
}

/** Retorna as iniciais de até 2 palavras do nome */
function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join('');
}

/** Paleta de cores por categoria */
const categoryColors: Record<string, string> = {
  Computadores: '#3b5bdb',
  Climatização: '#1098ad',
  Monitores: '#0ca678',
  Monitores2: '#37b24d',
  Áudio: '#f76707',
  Redes: '#d6336c',
};

function getAvatarColor(category: string): string {
  return categoryColors[category] ?? '#868e96';
}

/** Calcula custo mensal em R$ */
function calcMonthlyCost(
  watts: number,
  hoursPerDay: number,
  daysPerWeek: number,
  ratePerKwh: number,
): number {
  const weeksPerMonth = 4.33;
  const kwhPerMonth = (watts / 1000) * hoursPerDay * daysPerWeek * weeksPerMonth;
  return kwhPerMonth * ratePerKwh;
}

export default function CardDevice({
  name,
  category,
  power,
  hoursPerDay,
  daysPerWeek,
  costPerKwh = 0.75,
}: CardDeviceProps) {
  const initials = getInitials(name);
  const avatarColor = getAvatarColor(category);
  const monthlyCost = calcMonthlyCost(power, hoursPerDay, daysPerWeek, costPerKwh);
  const costFormatted = monthlyCost.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <Container>
      <AvatarBox $color={avatarColor}>
        <AvatarText>{initials}</AvatarText>
      </AvatarBox>

      <DeviceName>{name}</DeviceName>
      <CategoryLabel>{category}</CategoryLabel>

      <BadgesRow>
        <Badge>{power}W</Badge>
        <Badge>{hoursPerDay}h/dia</Badge>
        <Badge>{daysPerWeek} dias</Badge>
      </BadgesRow>

      <CostLabel>{costFormatted}/mês</CostLabel>
    </Container>
  );
}