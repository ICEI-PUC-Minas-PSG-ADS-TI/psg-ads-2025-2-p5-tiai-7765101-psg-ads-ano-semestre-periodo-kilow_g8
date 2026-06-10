// 'use client';

// import { useState, useEffect } from 'react';
// import Header from '@/components/header';
// import DescriptionPage from '@/components/descriptionPage';
// import DescriptionDevice from '@/components/descriptionDevice';
// import SearchInput from '@/components/searchInput';
// import Button from '@/components/button';
// import Image from 'next/image';
// import { getAllDevicesAction } from '@/actions/device';

// import {
//   DivSearch,
//   DivDevices,
//   DivDescription,
//   DivExtendDevice,
//   ButtonFilter,
// } from './style';

// interface Device {
//   id: number;
//   nome: string;
//   consumoWatts: number;
//   usoMinutosHorasDia: number;
//   usoDiasSemana: number;
//   consumoMensalKwh: number;
// }

// // MOCK - remover quando o back estiver disponível
// const mockDevices: Device[] = [
//   {
//     id: 1,
//     nome: 'TV da Sala',
//     consumoWatts: 100,
//     usoMinutosHorasDia: 120,
//     usoDiasSemana: 5,
//     consumoMensalKwh: 10,
//   },
//   {
//     id: 2,
//     nome: 'Ar Condicionado',
//     consumoWatts: 1500,
//     usoMinutosHorasDia: 240,
//     usoDiasSemana: 7,
//     consumoMensalKwh: 180,
//   },
//   {
//     id: 3,
//     nome: 'Geladeira',
//     consumoWatts: 150,
//     usoMinutosHorasDia: 1440,
//     usoDiasSemana: 7,
//     consumoMensalKwh: 45,
//   },
// ];
// const USE_MOCK = true;

// export default function DeviceList() {
//   const [devices, setDevices] = useState<Device[]>([]);
//   const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
//   const [valueSearch, setValueSearch] = useState('');
//   const [, ] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchDevices = async () => {
//       (true);

//       if (USE_MOCK) {
//         await new Promise((resolve) => setTimeout(resolve, 500));
//         setDevices(mockDevices);
//         setFilteredDevices(mockDevices);
//         (false);
//         return;
//       }
//       const result = await getAllDevicesAction();
//       if (result.success && result.devices) {
//         setDevices(result.devices);
//         setFilteredDevices(result.devices);
//       } else {
//         setError(result.message.description);
//       }
//       (false);
//     };

//     fetchDevices();
//   }, []);

//   const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setValueSearch(e.target.value);
//   };

//   const handleToFilter = () => {
//     const filtered = devices.filter((device) =>
//       device.nome.toLowerCase().includes(valueSearch.toLowerCase()),
//     );
//     setFilteredDevices(filtered);
//   };

//   const handleCleanFilters = () => {
//     setValueSearch('');
//     setFilteredDevices(devices);
//   };

//   return (
//     <div>
//       <Header />
//       {/* Resumo de todos os dispositivos + atalho de cadastro */}
//       <DivDescription>
//         <DescriptionPage
//           title="Meus dispositivos"
//           subtitle="6 dispositivos cadastrados · 178 kWh/mês · R$ 125,40/mês"
//         />
//         <Button
//           isEnabled={true}
//           handleClick={handleToFilter}
//           text="Cadastro por link"
//         />
//         <Button
//           isEnabled={true}
//           handleClick={handleToFilter}
//           text="Cadastro de dispositivos"
//         />
//       </DivDescription>

//       {/* Funcionalidade de pesquisa */}
//       <DivSearch>
//         <SearchInput
//           type="text"
//           placeholder="Procurando algo? Busque aqui!"
//           value={valueSearch}
//           onChange={handleChangeSearch}
//         />
//         <Button isEnabled={true} handleClick={handleToFilter} text="Filtrar" />
//         <Button
//           isEnabled={true}
//           handleClick={handleCleanFilters}
//           text="Limpar filtros"
//         />
//       </DivSearch>

//       <DivDevices>
//         { && <p>Carregando dispositivos...</p>}
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         {! && !error && filteredDevices.length === 0 && (
//           <p>Nenhum dispositivo encontrado.</p>
//         )}
//         {filteredDevices.map((device) => (
//           <DescriptionDevice
//             key={device.id}
//             name={device.nome}
//             power={`${device.consumoWatts}W`}
//             hour={`${device.usoMinutosHorasDia} min/dia`}
//             frequency={`${device.usoDiasSemana} dias/semana`}
//           />
//         ))}
//       </DivDevices>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/header';
import DescriptionPage from '@/components/descriptionPage';
import SearchInput from '@/components/searchInput';
import Button from '@/components/button';
import CardDevice from '@/components/cardDevice/index';
import SelectCategories from '@/components/selectCategories/index';
import { getAllDevicesAction } from '@/actions/device';

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

interface Device {
  id: number;
  nome: string;
  consumoWatts: number;
  usoMinutosHorasDia: number;
  usoDiasSemana: number;
  consumoMensalKwh: number;
  categorie?: string;
}

// Mock de dados até ser possível fazer a conexão com o back-end
const mockDevices: Device[] = [
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
  {
    id: 3,
    nome: 'Monitor LG 27"',
    categorie: 'Monitores',
    consumoWatts: 65,
    consumoMensalKwh: 2,
    usoMinutosHorasDia: 5,
    usoDiasSemana: 5,
  },
  {
    id: 4,
    nome: 'Notebook Dell',
    categorie: 'Computadores',
    consumoWatts: 45,
    consumoMensalKwh: 2,
    usoMinutosHorasDia: 4,
    usoDiasSemana: 5,
  },
  {
    id: 5,
    nome: 'Roteador WiFi',
    categorie: 'Redes',
    consumoWatts: 8,
    consumoMensalKwh: 2,
    usoMinutosHorasDia: 2,
    usoDiasSemana: 7,
  },
];

const kilowattPrice = 0.75; // R$/kWh — ajustar conforme tarifa real
const USE_MOCK = true;

function calcMonthlyCost(
  watts: number,
  hoursPerDay: number,
  daysPerWeek: number,
): number {
  //Quanto tempo que ele gasta utilizando o aparelho por dia
  let h = hoursPerDay * daysPerWeek;
  //O consumo mensal considerando o consumo diário (h)
  let consumoMensalEmWatt = watts * h;
  //Valor convertido de W (watts) para kL (kilowatts), para facilitar o cáculo e a comparação com o valor cobrado na conta de luz
  let valorConvertidoParaWhats = consumoMensalEmWatt / 1000;
  //Total achado multiplicado pelo valor do kilowatt descrito na conta de luz
  let custoTotal = valorConvertidoParaWhats * kilowattPrice;
  return custoTotal;
}

export default function DeviceList() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
  const [valueSearch, setValueSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas categorias');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDevices = async () => {
      //Essa verificação só existe enquanto os dados permancerem mocados
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setDevices(mockDevices);
        setFilteredDevices(mockDevices);
        return;
      }

      const result = await getAllDevicesAction();
      if (result.success && result.devices) {
        setDevices(result.devices);
        setFilteredDevices(result.devices);
      } else {
        setError(result.message.description);
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
    if (valueSearch.trim()) {
      const val = e.target.value;
      setValueSearch(val);
      applyFilters(val, selectedCategory);
    }
    setFilteredDevices(devices);
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
      <Header />
      {/* Resumo + botões de cadastro */}
      <DivDescription>
        <DescriptionPage
          title="Meus Dispositivos"
          subtitle={`${devices.length} dispositivos cadastrados · ${totalKwh} kWh/mês · ${totalCost}/mês`}
        />
        <Button
          isEnabled={true}
          handleClick={() => {}}
          text="Cadastro por link"
        />
        <Button
          isEnabled={true}
          handleClick={() => {}}
          text="+ Novo dispositivo"
        />
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
        <Button
          isEnabled={true}
          handleClick={handleCleanFilters}
          text="Limpar filtros"
        />
      </DivSearch>

      {/* Grid de cards */}
      <DivDevices>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {error && filteredDevices.length === 0 && (
          <p>Nenhum dispositivo encontrado.</p>
        )}
        {filteredDevices.map((device) => (
          <CardDevice
            key={device.id}
            name={device.nome}
            category={'Climatização'}
            power={device.consumoWatts}
            hoursPerDay={device.usoMinutosHorasDia}
            daysPerWeek={device.usoDiasSemana}
            costPerKwh={kilowattPrice}
          />
        ))}
      </DivDevices>

      {/* Link Mágico*/}
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
        <MagicLinkAction>Tentar agora →</MagicLinkAction>
      </MagicLinkBanner>
    </PageWrapper>
  );
}
