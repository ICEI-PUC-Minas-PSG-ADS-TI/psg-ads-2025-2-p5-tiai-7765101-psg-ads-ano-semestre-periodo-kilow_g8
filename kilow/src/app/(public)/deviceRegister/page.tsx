'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import Button from '@/components/button';
import CardDevice from '@/components/cardDevice/index';

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
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);

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

  const handleSave = async () => {
    if (!isFormValid) return;

    setLoading(true);

    try {
      // Ajuste a URL base se o seu backend estiver em outra porta ou domínio
      const API_URL = 'http://localhost:8080';

      // Monta o payload que o seu @PostMapping("/register") espera receber no corpo (RequestBody)
      const payload = {
        nome: form.nome,
        consumoWatts: parseFloat(form.consumoWatts),
        // Certifique-se de enviar o dado de tempo exatamente como o seu back-end (@Valid) espera
        usoMinutosHorasDia: parseInt(form.usoHorasDia, 10),
        usoDiasSemana: parseInt(form.usoDiasSemana, 10),
      };

      // Se você utiliza autenticação por token (ex: Bearer), lembre-se de adicionar o header de autorização
      const token = localStorage.getItem('token');

      const response = await fetch(`${API_URL}/devices/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Erro ao cadastrar dispositivo');
      }

      const data = await response.json();
      console.log('Dispositivo criado com sucesso:', data);

      // Redireciona para a listagem após o sucesso
      router.push('/deviceList');
    } catch (error: any) {
      alert(error.message || 'Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  // Valores para o preview
  const previewName = form.nome.trim() || 'Novo dispositivo';
  const previewCategory = form.categoria || 'Computadores';
  const previewPower = Number(form.consumoWatts) || 0;
  const previewHours = Number(form.usoHorasDia) || 0;
  const previewDays = Number(form.usoDiasSemana) || 0;

  return (
    <PageWrapper>
      <Header />

      <PageTitle>Novo dispositivo</PageTitle>
      <PageSubtitle>
        Preencha os dados do aparelho para calcular seu consumo e custo mensal
      </PageSubtitle>

      <ContentGrid>
        {/* ── Coluna esquerda: formulário ── */}
        <LeftColumn>
          <FormCard>
            {/* Nome */}
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

            {/* Categoria */}
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

            {/* Potência */}
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

            {/* Uso diário + dias por semana lado a lado */}
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

        {/* ── Coluna direita: preview em tempo real ── */}
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