'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/button';
import CardDevice from '@/components/cardDevice/index';

import { createDeviceAction } from '@/actions/device'; 
import { getBillingsListAction } from '@/actions/services/billing'; // ➔ Importa a service de faturas

import {
  PageWrapper,
  PageTitle,
  PageSubtitle,
  ContentGrid,
  LeftColumn,
  RightColumn,
  FormCard,
  FormGroup,
  FormLabel,
  FormInput,
  FormRow,
  FormHint,
  PreviewCard,
  PreviewTitle,
  PreviewWrapper,
  FooterRow,
} from './style';

interface FormState {
  nome: string;
  consumoWatts: string;
  usoHorasDia: string;
  usoDiasSemana: string;
}

const initialForm: FormState = {
  nome: '',
  consumoWatts: '',
  usoHorasDia: '',
  usoDiasSemana: '',
};

export default function CadastroDispositivo() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormState>(initialForm);

  const [loading, setLoading] = useState(false);
  
  const [ratePerKwh, setRatePerKwh] = useState(0.75);

  useEffect(() => {
    const fetchInitialData = async () => {
      const nomeUrl = searchParams.get('nome') || '';
      const potenciaUrl = searchParams.get('potencia') || '';

      if (nomeUrl || potenciaUrl) {
        setForm((prev) => ({
          ...prev,
          nome: nomeUrl || prev.nome,
          consumoWatts: potenciaUrl || prev.consumoWatts,
        }));
      }

      try {
        const billingsResult = await getBillingsListAction();

        if (billingsResult.success && billingsResult.content?.contas?.length) {
          const contasArray = billingsResult.content.contas;
          const lastConta = contasArray[contasArray.length - 1];
          

          if (lastConta && lastConta.tarifaEfetiva) {
            setRatePerKwh(lastConta.tarifaEfetiva);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar tarifa dinâmica no cadastro:", error);
      }
    };

    fetchInitialData();
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isFormValid =
    form.nome.trim() !== '' &&
    Number(form.consumoWatts) > 0 &&
    Number(form.usoHorasDia) > 0 &&
    Number(form.usoDiasSemana) > 0;

  const handleSave = async () => {
    if (!isFormValid) return;

    setLoading(true);

    try {
      const payload = {
        nome: form.nome.trim(),
        consumoWatts: parseFloat(form.consumoWatts) ? parseFloat(form.consumoWatts) : 0.0,
        usoMinutosHorasDia: parseInt(form.usoHorasDia, 10),
        usoDiasSemana: parseInt(form.usoDiasSemana, 10),
      };

      console.log('Enviando payload forçado para a Action:', payload);

      const response = await createDeviceAction(payload as any);

      console.log('Resposta da Action:', response);

      if (response.success) {
        alert(response.message?.description || 'Dispositivo cadastrado com sucesso!');
        router.push('/deviceList');
      } else {
        alert(response.message?.description || 'Erro ao cadastrar dispositivo.');
      }
    } catch (error: any) {
      alert('Erro inesperado de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  const previewName = form.nome.trim() || 'Novo dispositivo';
  const previewPower = Number(form.consumoWatts) || 0;
  const previewHours = Number(form.usoHorasDia) || 0;
  const previewDays = Number(form.usoDiasSemana) || 0;

  return (
    <PageWrapper>
      <PageTitle>Novo dispositivo</PageTitle>
      <PageSubtitle>
        Preencha os dados do aparelho para calcular seu consumo e custo mensal
      </PageSubtitle>

      <ContentGrid>
        <LeftColumn>
          <FormCard>
            <FormGroup>
              <FormLabel htmlFor="nome">Nome do dispositivo</FormLabel>
              <FormInput
                id="nome"
                name="nome"
                type="text"
                placeholder="Ex: PC Desktop, Geladeira, Ar-condicionado..."
                value={form.nome}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="consumoWatts">Potência (W)</FormLabel>
              <FormInput
                id="consumoWatts"
                name="consumoWatts"
                type="number"
                min="1"
                placeholder="Ex: 300"
                value={form.consumoWatts}
                onChange={handleChange}
              />
              <FormHint>
                Geralmente indicado na etiqueta ou manual do aparelho
              </FormHint>
            </FormGroup>

            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="usoHorasDia">Horas de uso por dia</FormLabel>
                <FormInput
                  id="usoHorasDia"
                  name="usoHorasDia"
                  type="number"
                  min="1"
                  max="24"
                  placeholder="Ex: 8"
                  value={form.usoHorasDia}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="usoDiasSemana">Dias de uso por semana</FormLabel>
                <FormInput
                  id="usoDiasSemana"
                  name="usoDiasSemana"
                  type="number"
                  min="1"
                  max="7"
                  placeholder="Ex: 5"
                  value={form.usoDiasSemana}
                  onChange={handleChange}
                />
              </FormGroup>
            </FormRow>
          </FormCard>

          <FooterRow>
            <FooterRow>
              <Button
                disabled={loading}
                onClick={() => router.push('/deviceList')}
              >
                Cancelar
              </Button>
              <Button
                disabled={!isFormValid || loading}
                onClick={handleSave}
              >
                {loading ? 'Salvando...' : 'Salvar dispositivo'}
              </Button>
            </FooterRow>
          </FooterRow>
        </LeftColumn>

        <RightColumn>
          <PreviewCard>
            <PreviewTitle>Pré-visualização</PreviewTitle>
            <PreviewWrapper>
              <CardDevice
                name={previewName}
                power={previewPower}
                hoursPerDay={previewHours}
                daysPerWeek={previewDays}
                costPerKwh={ratePerKwh} // ➔ Inserido o state dinâmico da tarifa efetiva
              />
            </PreviewWrapper>
          </PreviewCard>
        </RightColumn>
      </ContentGrid>
    </PageWrapper>
  );
}