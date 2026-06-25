'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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

// Exemplo de interface para tipar os dispositivos
interface Device {
  id: number;
  nome: string;
  categorie: string;
  consumoWatts: number;
  usoMinutosHorasDia: number;
  usoDiasSemana: number;
  maiorConsumidor?: boolean;
  avatarColor?: string;
  cadastradoEm?: string;
}

const RATE_PER_KWH = 0.78;
const WEEKS_PER_MONTH = 4.33;

function getInitials(name: string): string {
  return name.split(' ').slice(0, 2).map((w) => w.charAt(0).toUpperCase()).join('');
}

// Função utilitária para gerar cor aleatória ou baseada em categoria
function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
}

// 🔥 Função para gerar dicas e orientações baseadas no nome ou categoria do aparelho
function getDeviceInsight(nome: string, categoria: string, custoMensal: number) {
  const lowerName = nome.toLowerCase();
  const lowerCategory = categoria.toLowerCase();

  if (lowerName.includes('stand by') || lowerCategory.includes('standby')) {
    return {
      title: 'Atenção ao modo Stand-by',
      text: 'Verifique os aparelhos em stand-by. Eles podem representar até 10% do consumo da sua conta de luz silenciosamente.',
    };
  }

  if (lowerName.includes('fritadeira') || lowerName.includes('airfryer')) {
    return {
      title: 'Impacto do uso culinário',
      text: `Sabia que uma Airfryer consome bastante energia rapidamente devido à sua alta potência? O custo estimado deste uso é de <strong>R$ ${custoMensal.toFixed(2).replace('.', ',')}</strong> por mês.`,
    };
  }

  if (lowerName.includes('chuveiro') || lowerName.includes('descarga') || lowerName.includes('torneira')) {
    return {
      title: 'Dica de alto consumo',
      text: 'Opte por banhos mais curtos ou aparelhos mais eficientes. A descarga e o chuveiro elétrico gastam muito também.',
    };
  }

  // Dica padrão para dispositivos gerais
  return {
    title: 'Dica de economia',
    text: `Optar por desligar este aparelho quando não estiver em uso pode reduzir sua conta e gerar uma economia visível ao longo do ano.`,
  };
}

export default function DeviceDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [device, setDevice] = useState<Device | null>(null);

  useEffect(() => {
    // Busca a lista completa que foi salva no localStorage ou na listagem
    const storedDevices = localStorage.getItem('devices');
    if (storedDevices) {
      const devicesList: Device[] = JSON.parse(storedDevices);
      const idParam = searchParams.get('id');
      const found = devicesList.find((d) => d.id === Number(idParam)) || devicesList[0];
      setDevice(found || null);
    }
  }, [searchParams]);

  if (!device) {
    return (
      <PageWrapper>
        <p>Carregando detalhes do dispositivo...</p>
      </PageWrapper>
    );
  }

  // Cálculos baseados nos dados reais do dispositivo
  const kwhMonth = (device.consumoWatts / 1000) * device.usoMinutosHorasDia * device.usoDiasSemana * WEEKS_PER_MONTH;
  const costDay = (kwhMonth / 30) * RATE_PER_KWH;
  const costMonth = kwhMonth * RATE_PER_KWH;
  const costYear = costMonth * 12;

  const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const insight = getDeviceInsight(device.nome, device.categorie || '', costMonth);

  // Impacto ambiental simulado de forma proporcional ao consumo
  const co2Emissions = (kwhMonth * 0.52).toFixed(2); // Fator de emissão SIN (Sistema Interligado Nacional) aproximado
  const equivalentKm = (kwhMonth * 5.8).toFixed(0);
  const treesNeeded = (kwhMonth * 0.04).toFixed(1);

  return (
    <PageWrapper>
      <ContentGrid>
        {/* ── Coluna esquerda ── */}
        <LeftColumn>
          <DeviceCard>
            <DeviceTopRow>
              <AvatarBox $color={device.avatarColor || stringToColor(device.nome)}>
                <AvatarText>{getInitials(device.nome)}</AvatarText>
              </AvatarBox>

              <DeviceInfo>
                <DeviceName>{device.nome}</DeviceName>
                <DeviceMeta>
                  {device.categorie || 'Dispositivo'} · Cadastrado em {device.cadastradoEm || 'Sistema'}
                </DeviceMeta>
                {device.maiorConsumidor && (
                  <DeviceBadge>Maior consumidor</DeviceBadge>
                )}
              </DeviceInfo>

              <ActionRow>
                {/* Botão de Editar */}
                <Button
                  onClick={() => router.push(`/deviceRegister?id=${device.id}`)}
                >
                  Editar
                </Button>

                {/* Botão de Voltar */}
                <Button
                  onClick={() => router.push('/deviceList')}
                >
                  Voltar
                </Button>
              </ActionRow>
            </DeviceTopRow>

            <BadgesRow>
              <StatBadge>
                <StatValue>{device.consumoWatts}W</StatValue>
                <StatLabel>Potência</StatLabel>
              </StatBadge>
              <StatBadge>
                <StatValue>{device.usoMinutosHorasDia}h</StatValue>
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
              Baseado na tarifa efetiva R$ {RATE_PER_KWH.toFixed(2).replace('.', ',')}/kWh
            </CostNote>
          </CostCard>
        </LeftColumn>

        {/* ── Coluna direita ── */}
        <RightColumn>
          <ImpactCard>
            <ImpactTitle>Impacto ambiental</ImpactTitle>
            <ImpactSubtitle>Estimativas mensais baseadas no consumo médio</ImpactSubtitle>

            <ImpactItemRow>
              <ImpactIcon>🌿</ImpactIcon>
              <ImpactText>
                <ImpactValue>{co2Emissions} kg CO₂</ImpactValue>
                <ImpactDescription>emissões mensais estimadas (SIN)</ImpactDescription>
              </ImpactText>
            </ImpactItemRow>

            <ImpactItemRow>
              <ImpactIcon>🚗</ImpactIcon>
              <ImpactText>
                <ImpactValue>{equivalentKm} km de carro</ImpactValue>
                <ImpactDescription>equivalente em emissões mensais</ImpactDescription>
              </ImpactText>
            </ImpactItemRow>

            <ImpactItemRow>
              <ImpactIcon>🌳</ImpactIcon>
              <ImpactText>
                <ImpactValue>{treesNeeded} árvore</ImpactValue>
                <ImpactDescription>necessária para compensar/mês</ImpactDescription>
              </ImpactText>
            </ImpactItemRow>
          </ImpactCard>

          <TipCard>
            <TipTitle>{insight.title}</TipTitle>
            <TipText dangerouslySetInnerHTML={{ __html: insight.text }} />
          </TipCard>
        </RightColumn>
      </ContentGrid>
    </PageWrapper>
  );
}