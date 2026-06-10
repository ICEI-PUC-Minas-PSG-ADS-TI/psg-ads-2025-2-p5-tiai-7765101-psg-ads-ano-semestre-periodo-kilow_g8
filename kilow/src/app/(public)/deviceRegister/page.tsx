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

  const handleSave = () => {
    // TODO: conectar com a action de criação de dispositivo
    console.log('Salvar dispositivo:', form);
  };

  // Valores para o preview — usa fallback para não quebrar o card enquanto digita
  const previewName     = form.nome.trim()           || 'Novo dispositivo';
  const previewCategory = form.categoria             || 'Computadores';
  const previewPower    = Number(form.consumoWatts)  || 0;
  const previewHours    = Number(form.usoHorasDia)   || 0;
  const previewDays     = Number(form.usoDiasSemana) || 0;

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
            <Button isEnabled={true} handleClick={() => router.back()} text="Cancelar" />
            <Button isEnabled={isFormValid} handleClick={handleSave} text="Salvar dispositivo" />
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