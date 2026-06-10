// "use client";

// import { useState } from 'react';
// import CustomInput from '@/components/writingInput';
// import ListSelect from '@/components/selectCategories';
// import Header from '@/components/header';
// import DescriptionPage from '@/components/descriptionPage';
// import { createDeviceAction } from '@/actions/device';

// // Importando os componentes estilizados novos e os existentes
// import {
//     DivContainer,
//     ContainerRegister,
//     ContainerTitle,
//     Text,
//     ContainerSectionOne,
//     ContainerSectionTwo,
//     ContainerImage,
//     StyledButton,    // Novo
//     SelectContainer  // Novo
// } from './style';

// interface HandleChange {
//     event: React.ChangeEvent<HTMLInputElement>;
//     fieldId: number;
// }

// // MOCK - remover quando o back estiver disponível
// const mockDevices = [
//     { id: 1, nome: "TV da Sala", consumoWatts: 100, usoMinutosHorasDia: 120, usoDiasSemana: 5, consumoMensalKwh: 10 },
//     { id: 2, nome: "Ar Condicionado", consumoWatts: 1500, usoMinutosHorasDia: 240, usoDiasSemana: 7, consumoMensalKwh: 180 },
//     { id: 3, nome: "Geladeira", consumoWatts: 150, usoMinutosHorasDia: 1440, usoDiasSemana: 7, consumoMensalKwh: 45 },
// ];
// const USE_MOCK = true;

// export default function RegisterDevice() {
//     const [name, setName] = useState("");
//     const [dailyConsumption, setDailyConsumption] = useState("");
//     const [watts, setWatts] = useState("");
//     const [selectedDays, setSelectedDays] = useState<string[]>(["Segunda-feira", "Sexta-feira"]);
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState<{ title: string; description: string } | null>(null);
//     const [success, setSuccess] = useState(false);

//     const options = [
//         { label: "Segunda-feira", value: "Segunda-feira" },
//         { label: "Terça-feira", value: "Terça-feira" },
//         { label: "Quarta-feira", value: "Quarta-feira" },
//         { label: "Quinta-feira", value: "Quinta-feira" },
//         { label: "Sexta-feira", value: "Sexta-feira" },
//         { label: "Sábado", value: "Sábado" },
//         { label: "Domingo", value: "Domingo" }
//     ];

//     const handleChange = ({ event, fieldId }: HandleChange) => {
//         const newValue = event.target.value;
//         switch (fieldId) {
//             case 1: setName(newValue); break;
//             case 2: setDailyConsumption(newValue); break;
//             case 3: setWatts(newValue); break;
//         }
//     };

//     const handleSubmit = async () => {
//         setMessage(null);
//         setSuccess(false);

//         if (!name || !dailyConsumption || !watts || selectedDays.length === 0) {
//             setMessage({ title: "Atenção", description: "Preencha todos os campos obrigatórios." });
//             return;
//         }

//         const usoMinutosHorasDia = Number(dailyConsumption);
//         const consumoWatts = Number(watts);

//         if (isNaN(usoMinutosHorasDia) || isNaN(consumoWatts)) {
//             setMessage({ title: "Atenção", description: "Consumo diário e potência devem ser números." });
//             return;
//         }

//         setLoading(true);

//         if (USE_MOCK) {
//             await new Promise((resolve) => setTimeout(resolve, 800));
//             mockDevices.push({
//                 id: mockDevices.length + 1,
//                 nome: name,
//                 consumoWatts,
//                 usoMinutosHorasDia,
//                 usoDiasSemana: selectedDays.length,
//                 consumoMensalKwh: parseFloat(((consumoWatts * usoMinutosHorasDia / 60 * selectedDays.length * 4) / 1000).toFixed(2)),
//             });
//             setLoading(false);
//             setSuccess(true);
//             setMessage({ title: "Sucesso", description: "Dispositivo cadastrado com sucesso!" });
//             setName("");
//             setDailyConsumption("");
//             setWatts("");
//             setSelectedDays([]);
//             return;
//         }

//         const result = await createDeviceAction({
//             nome: name,
//             usoMinutosHorasDia,
//             usoDiasSemana: selectedDays.length,
//             consumoWatts,
//         });
        
//         setLoading(false);
//         setMessage(result.message);
//         setSuccess(result.success ?? false);

//         if (result.success) {
//             setName("");
//             setDailyConsumption("");
//             setWatts("");
//             setSelectedDays([]);
//         }
//     };

//     return (
//         <DivContainer>
//             <Header />
            
//             <ContainerTitle>
//                 <DescriptionPage
//                     title="Cadastre seu dispositivo!"
//                     subtitle="Preencha todos os campos solicitados e aguarde para uma futura análise"
//                 />
//             </ContainerTitle>

//             <ContainerRegister>
//                 {/* LADO ESQUERDO: FORMULÁRIO */}
//                 <ContainerSectionOne>
//                     <CustomInput
//                         label="Nome do aparelho *"
//                         type="text"
//                         value={name}
//                         placeholder='Ex: Tv da Sala'
//                         onChange={(e) => handleChange({ event: e, fieldId: 1 })} 
//                     />
                    
//                     <CustomInput
//                         label="Consumo diário (minutos) *"
//                         type="number"
//                         value={dailyConsumption}
//                         placeholder='Ex: 90'
//                         onChange={(e) => handleChange({ event: e, fieldId: 2 })} 
//                     />
                    
//                     <CustomInput
//                         label="Potência (W) *"
//                         type="number"
//                         value={watts}
//                         placeholder='Ex: 100'
//                         onChange={(e) => handleChange({ event: e, fieldId: 3 })} 
//                     />

//                     <SelectContainer>
//                         <ListSelect
//                             data={options}
//                             label="Consumo semanal (dias) *"
//                             onChange={(values) => setSelectedDays(values)}
//                         />
//                     </SelectContainer>

//                     {message && (
//                         <p style={{ 
//                             marginTop: "8px", 
//                             color: success ? "#2e7d32" : "#d32f2f",
//                             fontWeight: "500" 
//                         }}>
//                             <strong>{message.title}:</strong> {message.description}
//                         </p>
//                     )}

//                     <StyledButton onClick={handleSubmit} disabled={loading}>
//                         {loading ? "Cadastrando..." : "Cadastrar"}
//                     </StyledButton>
//                 </ContainerSectionOne>

//                 {/* LADO DIREITO: IMAGEM/BANNER */}
//                 <ContainerSectionTwo>
//                     <ContainerImage>
//                         <Text>Novidades em breve!</Text>
//                         <img 
//                             src="/assets/image-register-device.png" 
//                             alt="Ilustração de Registro"
//                             style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
//                         />
//                     </ContainerImage>
//                 </ContainerSectionTwo>
//             </ContainerRegister>
//         </DivContainer>
//     );
// }

export default function Teste() {
    return(
        <div> Olá </div>
    )
}