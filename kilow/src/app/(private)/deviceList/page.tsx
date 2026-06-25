'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DescriptionPage from '@/components/descriptionPage';
import SearchInput from '@/components/searchInput';
import Button from '@/components/button';
import CardDevice from '@/components/cardDevice/index';
import { getAllDevicesAction } from '@/actions/device';
import { getBillingsListAction } from '@/actions/services/billing'; // ➔ Importada a service correta de faturas
import { IDevice } from '@/actions/types/devices';

import {
  PageWrapper,
  DivSearch,
  DivDevices,
  DivDescription,
  MagicLinkBanner,
  MagicLinkLeft,
  MagicLinkIcon,
  MagicLinkTitle,
  MagicLinkSubtitle,
  MagicLinkAction,
} from './style';

const USE_MOCK = false; 

const mockDevices: IDevice[] = [
  {
    id: 1,
    nome: 'PC Desktop',
    consumoWatts: 300,
    consumoMensalKwh: 2,
    usoMinutosHorasDia: 8,
    usoDiasSemana: 5,
  },
  {
    id: 2,
    nome: 'Ar-cond. Split',
    consumoWatts: 750,
    consumoMensalKwh: 2,
    usoMinutosHorasDia: 3,
    usoDiasSemana: 5,
  },
];

export default function DeviceList() {
  const router = useRouter();

  const [devices, setDevices] = useState<IDevice[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<IDevice[]>([]);
  const [valueSearch, setValueSearch] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  // ➔ Estado dinâmico para a tarifa, lido da listagem de contas
  const [kilowattPrice, setKilowattPrice] = useState(0.75); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setDevices(mockDevices);
        setFilteredDevices(mockDevices);
        localStorage.setItem('devices', JSON.stringify(mockDevices));
        return;
      }

      setLoading(true);
      try {
        // Busca os dispositivos da API
        const devicesResult = await getAllDevicesAction();
        
        // ➔ Busca as faturas/contas utilizando a service existente
        const billingsResult = await getBillingsListAction();

        // Verifica se o retorno possui contas e pega a 'tarifaEfetiva' da última conta cadastrada
        if (billingsResult.success && billingsResult.content?.contas?.length) {
          const contasArray = billingsResult.content.contas;
          const lastContar = contasArray[contasArray.length - 1];
          
          if (lastContar && lastContar.tarifaEfetiva) {
            setKilowattPrice(lastContar.tarifaEfetiva);
          }
        }

        if (devicesResult.success && devicesResult.devices) {
          setDevices(devicesResult.devices);
          setFilteredDevices(devicesResult.devices);
          localStorage.setItem('devices', JSON.stringify(devicesResult.devices));
        } else {
          setError('Erro ao carregar dispositivos do servidor.');
        }
      } catch (err) {
        setError('Erro ao carregar dados da API.');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Função de cálculo que utiliza o kilowattPrice atualizado pela conta
  const calcMonthlyCost = (
    watts: number,
    hoursPerDay: number,
    daysPerWeek: number,
  ): number => {
    let h = hoursPerDay * daysPerWeek;
    let consumoMensalEmWatt = watts * h;
    let valorConvertidoParaWhats = consumoMensalEmWatt / 1000;
    let custoTotal = valorConvertidoParaWhats * kilowattPrice;
    return custoTotal;
  };

  const applyFilters = (search: string) => {
    let result = devices;

    if (search.trim()) {
      result = result.filter((d) =>
        d.nome.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setFilteredDevices(result);
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValueSearch(val);
    applyFilters(val);
  };

  const handleCleanFilters = () => {
    setValueSearch('');
    setFilteredDevices(devices);
  };

  const totalKwh = devices
    .reduce(
      (acc, d) =>
        acc +
        (d.consumoWatts / 1000) * d.usoMinutosHorasDia * d.usoDiasSemana * 4.33,
      0,
    )
    .toFixed(0);

  const totalCost = devices
    .reduce(
      (acc, d) =>
        acc +
        calcMonthlyCost(d.consumoWatts, d.usoMinutosHorasDia, d.usoDiasSemana),
      0,
    )
    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <PageWrapper>
      <DivDescription>
        <DescriptionPage
          title="Meus Dispositivos"
          subtitle={`${devices.length} dispositivos cadastrados · ${totalKwh} kWh/mês · ${totalCost}/mês`}
        />
        
        <Button onClick={() => router.push('/deviceRegisterLink')}>
          Cadastro por link
        </Button>
        
        <Button onClick={() => router.push('/deviceRegister')}>
          + Novo dispositivo
        </Button>
      </DivDescription>

      <DivSearch>
        <SearchInput
          type="text"
          placeholder="Buscar dispositivos..."
          value={valueSearch}
          onChange={handleChangeSearch}
        />
        
        <Button onClick={handleCleanFilters}>
          Limpar busca
        </Button>
      </DivSearch>

      <DivDevices>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {loading && <p>Carregando dispositivos...</p>}
        
        {!loading && filteredDevices.length === 0 && (
          <p>Nenhum dispositivo encontrado.</p>
        )}
        
        {filteredDevices.map((device) => (
          <CardDevice
            key={device.id}
            name={device.nome}
            power={device.consumoWatts}
            hoursPerDay={device.usoMinutosHorasDia}
            daysPerWeek={device.usoDiasSemana}
            costPerKwh={kilowattPrice} // ➔ Passa o valor da tarifa efetiva dinamicamente
            onClick={() => router.push(`/deviceDetail?id=${device.id}`)}
          />
        ))}
      </DivDevices>

      <MagicLinkBanner>
        <MagicLinkLeft>
          <MagicLinkIcon>🔗</MagicLinkIcon>
          <div>
            <MagicLinkTitle>Link Mágico</MagicLinkTitle>
            <MagicLinkSubtitle>
              Cole o link de qualquer produto na Amazon ou Kabum e a IA extrai
              nome e potência
            </MagicLinkSubtitle>
          </div>
        </MagicLinkLeft>
        <MagicLinkAction onClick={() => router.push('/deviceRegisterLink')}>
          Tentar agora →
        </MagicLinkAction>
      </MagicLinkBanner>
    </PageWrapper>
  );
}