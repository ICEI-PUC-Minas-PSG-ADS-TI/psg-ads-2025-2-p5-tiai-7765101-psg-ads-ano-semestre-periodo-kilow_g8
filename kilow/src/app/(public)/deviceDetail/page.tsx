'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import Button from '@/components/button';

import {
  PageWrapper,
  ContentGrid,
  LeftColumn,
  RightColumn,
  DeviceCard,
  DeviceTopRow,
  AvatarBox,
  AvatarText,
  DeviceInfo,
  DeviceName,
  DeviceMeta,
  DeviceBadge,
  ActionRow,
  BadgesRow,
  StatBadge,
  StatValue,
  StatLabel,
  CostCard,
  CostTitle,
  CostRow,
  CostRowLabel,
  CostRowValue,
  CostHighlight,
  CostNote,
  ImpactCard,
  ImpactTitle,
  ImpactSubtitle,
  ImpactItemRow,
  ImpactIcon,
  ImpactText,
  ImpactValue,
  ImpactDescription,
  TipCard,
  TipTitle,
  TipText,
} from './stye';

// MOCK — remover quando o back estiver disponível
const mockDevice = {
  id: 1,
  nome: 'PC Desktop',
  categoria: 'Computadores',
  consumoWatts: 300,
  usoHorasDia: 8,
  usoDiasSemana: 5,
  cadastradoEm: '10/03/2025',
  maiorConsumidor: true,
  tarifaKwh: 0.78,
  avatarColor: '#3b5bdb',
};

const mockCosts = {
  porDia: 1.79,
  porMes: 37.44,
  porAno: 449.28,
  tarifaReferencia: 'R$ 0,78/kWh (mar/2025)',
};

const mockImpact = [
  { icon: '🌿', value: '3,92 kg CO₂', description: 'emissões mensais estimadas (SIN)' },
  { icon: '🚗', value: '23 km de carro', description: 'equivalente em emissões mensais' },
  { icon: '🌳', value: '0,2 árvore', description: 'necessária para compensar/mês' },
];

const mockTip =
  'Habilitar suspensão após 10 min de inatividade pode reduzir o consumo em até 15%, economizando R$ 5,60/mês.';

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join('');
}

export default function DeviceDetail() {
  const router = useRouter();

  return (
    <PageWrapper>
      <Header />

      <ContentGrid>
        {/* Coluna esquerda */}
        <LeftColumn>
          {/* Card principal do dispositivo */}
          <DeviceCard>
            <DeviceTopRow>
              <AvatarBox $color={mockDevice.avatarColor}>
                <AvatarText>{getInitials(mockDevice.nome)}</AvatarText>
              </AvatarBox>
              <DeviceInfo>
                <DeviceName>{mockDevice.nome}</DeviceName>
                <DeviceMeta>
                  {mockDevice.categoria} · Cadastrado {mockDevice.cadastradoEm}
                </DeviceMeta>
                {mockDevice.maiorConsumidor && (
                  <DeviceBadge>Maior consumidor</DeviceBadge>
                )}
              </DeviceInfo>
              <ActionRow>
                <Button isEnabled={true} handleClick={() => {}} text="Editar" />
                <Button isEnabled={true} handleClick={() => router.back()} text="Excluir" />
              </ActionRow>
            </DeviceTopRow>

            <BadgesRow>
              <StatBadge>
                <StatValue>{mockDevice.consumoWatts}W</StatValue>
                <StatLabel>Potência</StatLabel>
              </StatBadge>
              <StatBadge>
                <StatValue>{mockDevice.usoHorasDia}h</StatValue>
                <StatLabel>por dia</StatLabel>
              </StatBadge>
              <StatBadge>
                <StatValue>{mockDevice.usoDiasSemana} dias</StatValue>
                <StatLabel>por semana</StatLabel>
              </StatBadge>
            </BadgesRow>
          </DeviceCard>

          {/* Card de custo estimado */}
          <CostCard>
            <CostTitle>Custo estimado</CostTitle>

            <CostRow>
              <CostRowLabel>Por dia</CostRowLabel>
              <CostRowValue>
                {mockCosts.porDia.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </CostRowValue>
            </CostRow>

            <CostRow $highlight>
              <CostRowLabel>Por mês</CostRowLabel>
              <CostHighlight>
                {mockCosts.porMes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </CostHighlight>
            </CostRow>

            <CostRow>
              <CostRowLabel>Por ano</CostRowLabel>
              <CostRowValue>
                {mockCosts.porAno.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </CostRowValue>
            </CostRow>

            <CostNote>Baseado na tarifa efetiva {mockCosts.tarifaReferencia}</CostNote>
          </CostCard>
        </LeftColumn>

        {/* Coluna direita */}
        <RightColumn>
          {/* Card de impacto ambiental */}
          <ImpactCard>
            <ImpactTitle>Impacto ambiental</ImpactTitle>
            <ImpactSubtitle>Estimativas mensais baseadas no consumo médio</ImpactSubtitle>

            {mockImpact.map((item) => (
              <ImpactItemRow key={item.value}>
                <ImpactIcon>{item.icon}</ImpactIcon>
                <ImpactText>
                  <ImpactValue>{item.value}</ImpactValue>
                  <ImpactDescription>{item.description}</ImpactDescription>
                </ImpactText>
              </ImpactItemRow>
            ))}
          </ImpactCard>

          {/* Card de dica de economia */}
          <TipCard>
            <TipTitle>Dica de economia</TipTitle>
            <TipText>{mockTip}</TipText>
          </TipCard>
        </RightColumn>
      </ContentGrid>
    </PageWrapper>
  );
}