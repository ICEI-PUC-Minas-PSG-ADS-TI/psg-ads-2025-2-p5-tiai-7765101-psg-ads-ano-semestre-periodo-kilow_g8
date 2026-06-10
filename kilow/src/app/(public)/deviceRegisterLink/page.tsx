'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import Button from '@/components/button';

import {
  PageWrapper,
  Card,
  CardHeader,
  CardIcon,
  CardTitle,
  CardSubtitle,
  StepRow,
  StepItem,
  StepCircle,
  StepLabel,
  StepDivider,
  FormGroup,
  FormLabel,
  UrlInput,
  UrlRow,
  ExamplesRow,
  ExampleChip,
} from './style';

const STEPS = [
  { number: 1, label: 'Link do produto' },
  { number: 2, label: 'Análise por IA' },
  { number: 3, label: 'Confirmar dados' },
];

const EXAMPLES = ['Exemplo: Monitor LG', 'Exemplo: PC Gamer'];

export default function CadastroLink() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [currentStep] = useState(1);

  const handleAnalyze = () => {
    // TODO: conectar com a action de análise por IA
    console.log('Analisar URL:', url);
  };

  const handleExample = (example: string) => {
    setUrl(`https://www.amazon.com.br/${example.replace('Exemplo: ', '').replace(' ', '-')}...`);
  };

  return (
    <PageWrapper>
      <Header />

      <Card>
        {/* Cabeçalho do card */}
        <CardHeader>
          <CardIcon>🔗</CardIcon>
          <div>
            <CardTitle>Cadastro inteligente</CardTitle>
            <CardSubtitle>Cole o link do produto — a IA faz o resto</CardSubtitle>
          </div>
        </CardHeader>

        {/* Stepper */}
        <StepRow>
          {STEPS.map((step, index) => (
            <div key={step.number} style={{ display: 'flex', alignItems: 'center' }}>
              <StepItem>
                <StepCircle $active={step.number === currentStep} $done={step.number < currentStep}>
                  {step.number}
                </StepCircle>
                <StepLabel $active={step.number === currentStep}>{step.label}</StepLabel>
              </StepItem>
              {index < STEPS.length - 1 && <StepDivider />}
            </div>
          ))}
        </StepRow>

        {/* Formulário */}
        <FormGroup>
          <FormLabel>Link do produto (Amazon, Kabum, Pichau...)</FormLabel>
          <UrlRow>
            <UrlInput
              type="url"
              placeholder="https://www.amazon.com.br/Monitor-LG..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button isEnabled={url.trim().length > 0} handleClick={handleAnalyze} text="Analisar" />
          </UrlRow>
        </FormGroup>

        {/* Chips de exemplo */}
        <ExamplesRow>
          {EXAMPLES.map((ex) => (
            <ExampleChip key={ex} onClick={() => handleExample(ex)}>
              {ex}
            </ExampleChip>
          ))}
        </ExamplesRow>
      </Card>
    </PageWrapper>
  );
}