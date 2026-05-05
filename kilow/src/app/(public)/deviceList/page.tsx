"use client";

import { useState } from 'react';
import Header from '@/components/header';
import DescriptionPage from '@/components/descriptionPage';
import DescriptionDevice from '@/components/descriptionDevice';
import SearchInput from '@/components/searchInput';
import Button from '@/components/button'
import Image from 'next/image';

import {
    DivSearch, DivDevices, DivExtendDevice, button
} from './style';


export default function DeviceList() {

    //Pegar valor digitado no input
    const [valueSearch, setValueSearch] = ("");
    const handleChangeSearch = () => {
        console.log("Pegar valor do input")
    }
    //Funções a partir do clique dos botões
    const handleFiltrar = () => {
        console.log("Botão de filtro clicado");
    }
    const handleLimparFIltros = () => {
        console.log("Filtros limpos");
    }


    return (

        <div>
            <Header></Header>
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
                    handleClick={handleLimparFIltros}
                    text="Limpar filtros"
                />
            </DivSearch>
            <div>
                <DivDevices>
                    <DescriptionDevice
                        name="Máquina de lavar"
                        power="X watts"
                        hour="5 horas"
                        frequency="5 dias"
                    />
                    <DescriptionDevice
                        name="Máquina de lavar"
                        power="X watts"
                        hour="5 horas"
                        frequency="5 dias"
                    />
                    <DescriptionDevice
                        name="Máquina de lavar"
                        power="X watts"
                        hour="5 horas"
                        frequency="5 dias"
                    />
                    <DescriptionDevice
                        name="Máquina de lavar"
                        power="X watts"
                        hour="5 horas"
                        frequency="5 dias"
                    />
                </DivDevices>
            </div>
            <Image
                src={'/assets/image-line.png'}
                alt="icone"
                width={30}
                height={30}
            />
            <DivExtendDevice>
                <button> Nome </button>
            </DivExtendDevice>
        </div>
    );
}