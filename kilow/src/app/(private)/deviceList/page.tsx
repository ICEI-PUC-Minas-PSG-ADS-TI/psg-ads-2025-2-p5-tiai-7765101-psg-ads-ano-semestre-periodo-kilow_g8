'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DescriptionPage from '@/components/descriptionPage';
import SearchInput from '@/components/searchInput';
import Button from '@/components/button';
import CardDevice from '@/components/cardDevice/index';
import SelectCategories from '@/components/selectCategories/index';
import { getAllDevicesAction } from '@/actions/device';
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

const kilowattPrice = 0.75; // R$/kWh — ajustar conforme tarifa real

// Altere para false para conectar com a sua API (Spring Boot)
const USE_MOCK = false; 

const mockDevices: IDevice[] = [
  {
    id: 1,
    nome: 'PC Desktop',
    categorie: 'Computadores',
    consumoWatts: 300,
    consumoMensalKwh: 2,
    usoMinutosHorasDia: 8,
    usoDiasSemana: 5,
  },
  {
    id: 2,
    nome: 'Ar-cond. Split',
    categorie: 'Climatização',
    consumoWatts: 750,
    consumoMensalKwh: 2,
    usoMinutosHorasDia: 3,
    usoDiasSemana: 5,
  },
];

function calcMonthlyCost(
  watts: number,
  hoursPerDay: number,
  daysPerWeek: number,
): number {
  let h = hoursPerDay * daysPerWeek;
  let consumoMensalEmWatt = watts * h;
  let valorConvertidoParaWhats = consumoMensalEmWatt / 1000;
  let custoTotal = valorConvertidoParaWhats * kilowattPrice;
  return custoTotal;
}

export default function DeviceList() {
  const router = useRouter();

  const [devices, setDevices] = useState<IDevice[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<IDevice[]>([]);
  const [valueSearch, setValueSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas categorias');
  const [error, setError] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDevices = async () => {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setDevices(mockDevices);
        setFilteredDevices(mockDevices);
        return;
      }

      setLoading(true);
      const result = await getAllDevicesAction();
      setLoading(false);
      
      if (result.success && result.devices) {
        setDevices(result.devices);
        setFilteredDevices(result.devices);
      } else {
        setError('Erro ao carregar dispositivos do servidor.');
      }
    };

    fetchDevices();
  }, []);

  /** Aplica busca por nome + filtro de categoria */
  const applyFilters = (search: string, category: string) => {
    let result = devices;

    if (search.trim()) {
      result = result.filter((d) =>
        d.nome.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category !== 'Todas categorias') {
      result = result.filter((d) => d.categorie === category);
    }

    setFilteredDevices(result);
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValueSearch(val);
    applyFilters(val, selectedCategory);
  };

  const handleChangeCategory = (category: string) => {
    setSelectedCategory(category);
    applyFilters(valueSearch, category);
  };

  const handleCleanFilters = () => {
    setValueSearch('');
    setSelectedCategory('Todas categorias');
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

      {/* Resumo + botões de cadastro */}
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

      {/* Barra de busca + filtro de categoria */}
      <DivSearch>
        <SearchInput
          type="text"
          placeholder="Buscar dispositivos..."
          value={valueSearch}
          onChange={handleChangeSearch}
        />
        <SelectCategories
          value={selectedCategory}
          onChange={handleChangeCategory}
        />
        
        <Button onClick={handleCleanFilters}>
          Limpar filtros
        </Button>
      </DivSearch>

      {/* Grid de cards — clique → deviceDetail */}
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
            category={device.categorie ?? 'Computadores'}
            power={device.consumoWatts}
            hoursPerDay={device.usoMinutosHorasDia}
            daysPerWeek={device.usoDiasSemana}
            costPerKwh={kilowattPrice}
            onClick={() => router.push(`/deviceDetail?id=${device.id}`)}
          />
        ))}
      </DivDevices>

      {/* Link Mágico */}
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