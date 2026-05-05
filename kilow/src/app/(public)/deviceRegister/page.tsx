"use client";


import { useState } from 'react';
import CustomInput from '@/components/writingInput';
import ListSelect from '@/components/listSelect';
import Header from '@/components/header';
import DescriptionPage from '@/components/descriptionPage';
import {
    DivContainer, ContainerRegister, ContainerTitle,
    Title, Text, SubTitle, ContainerSectionOne, ContainerSectionTwo, ContainerImage
} from './style';



interface HandleChange {
    event: React.ChangeEvent<HTMLInputElement>;
    fieldId: number;
}

export default function RegisterDevice() {
    const [name, setName] = useState("Ex: Tv da Sala");
    const [dailyConsumption, setDailyConsumption] = useState("Ex: 3 horas");
    const [weeklyConsumption, setWeeklyConsumption] = useState("Ex: 2 dias por semana");
    const [watts, setWatts] = useState("Ex: 100W");

    const options = [
        { label: "Segunda-feira", value: "Segunda-feira" },
        { label: "Terça-feira", value: "Terça-feira" },
        { label: "Quarta-feira", value: "Quarta-feira" },
        { label: "Quinta-feira", value: "Quinta-feira" },
        { label: "Sexta-feira", value: "Sexta-feira" },
        { label: "Sábado", value: "Sábado" },
        { label: "Domingo", value: "Domingo" }
    ];

    const handleChange = ({ event, fieldId }: HandleChange) => {
        const newValue = event.target.value;
        switch (fieldId) {
            case 1: setName(newValue); break;
            case 2: setDailyConsumption(newValue); break;
            case 3: setWatts(newValue); break;
        }
    };

    return (

        <DivContainer>
            <Header></Header>
            <ContainerTitle>
                <DescriptionPage
                  title= "Cadastre seu dispositivo!"
                  subtitle= "Preencha todos os campos solicitados e aguarde para uma futura análise"
                 />
            </ContainerTitle>
            <ContainerRegister>
                <ContainerSectionOne>
                    <CustomInput
                        label="Nome do aparelho *"
                        type="text"
                        value={name}
                        placeholder='Ex: Tv da Sala'
                        onChange={(e) => handleChange({ event: e, fieldId: 1 })} />
                    <CustomInput
                        label="Consumo diário *"
                        type="text"
                        value={dailyConsumption}
                        placeholder='Ex: 90 minutos'
                        onChange={(e) => handleChange({ event: e, fieldId: 2 })} />
                    <CustomInput
                        label="Potência (W)"
                        type="text"
                        value={watts}
                        placeholder='20W'
                        onChange={(e) => handleChange({ event: e, fieldId: 3 })} />
                    <ListSelect data={options} label="Consumo semanal (dias) *" />
                </ContainerSectionOne>
                <ContainerSectionTwo>
                    <ContainerImage>
                        <Text>Novidades em breve!</Text>
                        <img src="/assets/image-register-device.png" alt="Registro"
                            width="400px"
                            height="400px"
                        />
                    </ContainerImage>
                </ContainerSectionTwo>
            </ContainerRegister>
        </DivContainer>
    );
}