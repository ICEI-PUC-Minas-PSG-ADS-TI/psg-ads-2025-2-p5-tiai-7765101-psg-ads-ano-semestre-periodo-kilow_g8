'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/button';
import CardDevice from '@/components/cardDevice/index';

// 🔥 Importe a sua action diretamente dos serviços/ações
import { createDeviceAction } from '@/actions/device'; 

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
  FormSelect,
  FormRow,
  FormHint,
  PreviewCard,
  PreviewTitle,
  PreviewWrapper,
  FooterRow,
} from './style';

const CATEGORIES = [
  'Computadores',
  'Climatização',
  'Monitores',
  'Áudio',
  'Redes',
];

const RATE_PER_KWH = 0.75;

interface FormState {
  nome: string;
  categoria: string;
  consumoWatts: string;
  usoHorasDia: string;
  usoDiasSemana: string;
}

const initialForm: FormState = {
  nome: '',
  categoria: '',
  consumoWatts: '',
  usoHorasDia: '',
  usoDiasSemana: '',
};

export default function CadastroDispositivo() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const nomeUrl = searchParams.get('nome') || '';
    const potenciaUrl = searchParams.get('potencia') || '';

    if (nomeUrl || potenciaUrl) {
      setForm((prev) => ({
        ...prev,
        nome: nomeUrl || prev.nome,
        consumoWatts: potenciaUrl || prev.consumoWatts,
      }));
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isFormValid =
    form.nome.trim() !== '' &&
    form.categoria !== '' &&
    Number(form.consumoWatts) > 0 &&
    Number(form.usoHorasDia) > 0 &&
    Number(form.usoDiasSemana) > 0;

  // 🔥 Nova função handleSave integrada com a Action
  const handleSave = async () => {
    if (!isFormValid) return;

    setLoading(true);

    try {
      const payload = {
        nome: form.nome,
        // Certifique-se de que as chaves batem com a interface CreateDeviceRequest do seu back-end
        categorie: form.categoria, 
        consumoWatts: parseFloat(form.consumoWatts),
        usoMinutosHorasDia: parseInt(form.usoHorasDia, 10),
        usoDiasSemana: parseInt(form.usoDiasSemana, 10),
        consumoMensalKwh: 0, // Adicione caso o seu DTO exija este campo obrigatório
      };

      console.log('Enviando payload para a Action:', payload);

      // Chamando a sua action configurada
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
  const previewCategory = form.categoria || 'Computadores';
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
              <FormLabel htmlFor="categoria">Categoria</FormLabel>
              <FormSelect
                id="categoria"
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Selecione uma categoria
                </option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </FormSelect>
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
                category={previewCategory}
                power={previewPower}
                hoursPerDay={previewHours}
                daysPerWeek={previewDays}
                costPerKwh={RATE_PER_KWH}
              />
            </PreviewWrapper>
          </PreviewCard>
        </RightColumn>
      </ContentGrid>
    </PageWrapper>
  );
}