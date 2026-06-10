"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/header';
import DescriptionPage from '@/components/descriptionPage';
import DescriptionDevice from '@/components/descriptionDevice';
import SearchInput from '@/components/searchInput';
import Button from '@/components/button';
import Image from 'next/image';
import { getAllDevicesAction } from '@/actions/device';

import {
    DivSearch, DivDevices, DivExtendDevice, ButtonFilter
} from './style';

interface Device {
    id: number;
    nome: string;
    consumoWatts: number;
    usoMinutosHorasDia: number;
    usoDiasSemana: number;
    consumoMensalKwh: number;
}

// MOCK - remover quando o back estiver disponível
const mockDevices: Device[] = [
    {
        id: 1,
        nome: "TV da Sala",
        consumoWatts: 100,
        usoMinutosHorasDia: 120,
        usoDiasSemana: 5,
        consumoMensalKwh: 10,
    },
    {
        id: 2,
        nome: "Ar Condicionado",
        consumoWatts: 1500,
        usoMinutosHorasDia: 240,
        usoDiasSemana: 7,
        consumoMensalKwh: 180,
    },
    {
        id: 3,
        nome: "Geladeira",
        consumoWatts: 150,
        usoMinutosHorasDia: 1440,
        usoDiasSemana: 7,
        consumoMensalKwh: 45,
    },
];
const USE_MOCK = true; 

export default function DeviceList() {
    const [devices, setDevices] = useState<Device[]>([]);
    const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
    const [valueSearch, setValueSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDevices = async () => {
            setLoading(true);

            if (USE_MOCK) {
                await new Promise((resolve) => setTimeout(resolve, 500));
                setDevices(mockDevices);
                setFilteredDevices(mockDevices);
                setLoading(false);
                return;
            }
            const result = await getAllDevicesAction();
            if (result.success && result.devices) {
                setDevices(result.devices);
                setFilteredDevices(result.devices);
            } else {
                setError(result.message.description);
            }
            setLoading(false);
        };

        fetchDevices();
    }, []);

    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueSearch(e.target.value);
    };

    const handleFiltrar = () => {
        const filtered = devices.filter((device) =>
            device.nome.toLowerCase().includes(valueSearch.toLowerCase())
        );
        setFilteredDevices(filtered);
    };

    const handleLimparFiltros = () => {
        setValueSearch("");
        setFilteredDevices(devices);
    };

    return (
        <div>
            <Header />
            <DescriptionPage
                title="Listagem de dispositivos"
                subtitle="Visualize, edite e exclua seus dispositivos já cadastrados"
            />
            <DivSearch>
                <SearchInput
                    type="text"
                    placeholder="Procurando algo? Busque aqui!"
                    value={valueSearch}
                    onChange={handleChangeSearch}
                />
                <Button
                    isEnabled={true}
                    handleClick={handleFiltrar}
                    text="Filtrar"
                />
                <Button
                    isEnabled={true}
                    handleClick={handleLimparFiltros}
                    text="Limpar filtros"
                />
            </DivSearch>

            <div>
                {loading && <p>Carregando dispositivos...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {!loading && !error && filteredDevices.length === 0 && (
                    <p>Nenhum dispositivo encontrado.</p>
                )}
                <DivDevices>
                    {filteredDevices.map((device) => (
                        <DescriptionDevice
                            key={device.id}
                            name={device.nome}
                            power={`${device.consumoWatts}W`}
                            hour={`${device.usoMinutosHorasDia} min/dia`}
                            frequency={`${device.usoDiasSemana} dias/semana`}
                        />
                    ))}
                </DivDevices>
            </div>

            <Image
                src={'/assets/image-line.png'}
                alt="icone"
                width={30}
                height={30}
            />
        </div>
    );
}