'use client';

import { useRouter, useSearchParams } from 'next/navigation';
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
const mockDevices = [
  { id: 1, nome: 'PC Desktop',     categoria: 'Computadores', consumoWatts: 300, usoHorasDia: 8,  usoDiasSemana: 5, cadastradoEm: '10/03/2025', maiorConsumidor: true,  avatarColor: '#3b5bdb' },
  { id: 2, nome: 'Ar-cond. Split', categoria: 'Climatização', consumoWatts: 750, usoHorasDia: 3,  usoDiasSemana: 5, cadastradoEm: '10/03/2025', maiorConsumidor: false, avatarColor: '#1098ad' },
  { id: 3, nome: 'Monitor LG 27"', categoria: 'Monitores',    consumoWatts: 65,  usoHorasDia: 8,  usoDiasSemana: 5, cadastradoEm: '11/03/2025', maiorConsumidor: false, avatarColor: '#0ca678' },
  { id: 4, nome: 'Notebook Dell',  categoria: 'Computadores', consumoWatts: 45,  usoHorasDia: 8,  usoDiasSemana: 5, cadastradoEm: '11/03/2025', maiorConsumidor: false, avatarColor: '#3b5bdb' },
  { id: 5, nome: 'Roteador WiFi',  categoria: 'Redes',        consumoWatts: 8,   usoHorasDia: 24, usoDiasSemana: 7, cadastradoEm: '12/03/2025', maiorConsumidor: false, avatarColor: '#d6336c' },
  { id: 6, nome: 'Caixa de som',   categoria: 'Áudio',        consumoWatts: 20,  usoHorasDia: 4,  usoDiasSemana: 5, cadastradoEm: '12/03/2025', maiorConsumidor: false, avatarColor: '#f76707' },
];

const RATE_PER_KWH = 0.78;
const WEEKS_PER_MONTH = 4.33;

const mockImpact = [
  { icon: '🌿', value: '3,92 kg CO₂',     description: 'emissões mensais estimadas (SIN)' },
  { icon: '🚗', value: '23 km de carro',   description: 'equivalente em emissões mensais'  },
  { icon: '🌳', value: '0,2 árvore',       description: 'necessária para compensar/mês'    },
];

function getInitials(name: string): string {
  return name.split(' ').slice(0, 2).map((w) => w.charAt(0).toUpperCase()).join('');
}

export default function DeviceDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Lê o id da query: /deviceDetail?id=1
  const idParam = searchParams.get('id');
  const device = mockDevices.find((d) => d.id === Number(idParam)) ?? mockDevices[0];

  const kwhMonth  = (device.consumoWatts / 1000) * device.usoHorasDia * device.usoDiasSemana * WEEKS_PER_MONTH;
  const costDay   = (kwhMonth / 30) * RATE_PER_KWH;
  const costMonth = kwhMonth * RATE_PER_KWH;
  const costYear  = costMonth * 12;

  const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <PageWrapper>
      <Header />

      <ContentGrid>
        {/* ── Coluna esquerda ── */}
        <LeftColumn>
          <DeviceCard>
            <DeviceTopRow>
              <AvatarBox $color={device.avatarColor}>
                <AvatarText>{getInitials(device.nome)}</AvatarText>
              </AvatarBox>

              <DeviceInfo>
                <DeviceName>{device.nome}</DeviceName>
                <DeviceMeta>
                  {device.categoria} · Cadastrado {device.cadastradoEm}
                </DeviceMeta>
                {device.maiorConsumidor && (
                  <DeviceBadge>Maior consumidor</DeviceBadge>
                )}
              </DeviceInfo>

              <ActionRow>
                {/* Editar → deviceRegister com o id para pré-preencher o form */}
                <Button
                  isEnabled={true}
                  handleClick={() => router.push(`/deviceRegister?id=${device.id}`)}
                  text="Editar"
                />
                {/* Voltar para a listagem */}
                <Button
                  isEnabled={true}
                  handleClick={() => router.push('/deviceList')}
                  text="Voltar"
                />
              </ActionRow>
            </DeviceTopRow>

            <BadgesRow>
              <StatBadge>
                <StatValue>{device.consumoWatts}W</StatValue>
                <StatLabel>Potência</StatLabel>
              </StatBadge>
              <StatBadge>
                <StatValue>{device.usoHorasDia}h</StatValue>
                <StatLabel>por dia</StatLabel>
              </StatBadge>
              <StatBadge>
                <StatValue>{device.usoDiasSemana} dias</StatValue>
                <StatLabel>por semana</StatLabel>
              </StatBadge>
            </BadgesRow>
          </DeviceCard>

          <CostCard>
            <CostTitle>Custo estimado</CostTitle>

            <CostRow>
              <CostRowLabel>Por dia</CostRowLabel>
              <CostRowValue>{fmt(costDay)}</CostRowValue>
            </CostRow>

            <CostRow $highlight>
              <CostRowLabel>Por mês</CostRowLabel>
              <CostHighlight>{fmt(costMonth)}</CostHighlight>
            </CostRow>

            <CostRow>
              <CostRowLabel>Por ano</CostRowLabel>
              <CostRowValue>{fmt(costYear)}</CostRowValue>
            </CostRow>

            <CostNote>
              Baseado na tarifa efetiva R$ {RATE_PER_KWH.toFixed(2).replace('.', ',')}/kWh (mar/2025)
            </CostNote>
          </CostCard>
        </LeftColumn>

        {/* ── Coluna direita ── */}
        <RightColumn>
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

          <TipCard>
            <TipTitle>Dica de economia</TipTitle>
            <TipText>
              Habilitar suspensão após 10 min de inatividade pode reduzir o consumo em até{' '}
              <strong>15%</strong>, economizando <strong>{fmt(costMonth * 0.15)}/mês</strong>.
            </TipText>
          </TipCard>
        </RightColumn>
      </ContentGrid>
    </PageWrapper>
  );
}