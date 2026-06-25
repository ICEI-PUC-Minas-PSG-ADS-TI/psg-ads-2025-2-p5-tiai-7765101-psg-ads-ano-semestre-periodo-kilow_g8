'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/button';
import { extractWattsFromUrlAction } from '@/actions/device';

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
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Estado para verificar se o componente já foi montado no navegador
  //Porque precisa desse estado?
  const [isMounted, setIsMounted] = useState(false);

  // Efeito para preencher o formulário caso venham parâmetros via URL do cadastro por link
//Essa é a conexão com o registerDevice, certo? Pois eu coloco o link e me redireciona para a página de cadastro do dispostivo com a potência já preenchida
  useEffect(() => {
    setIsMounted(true);
  }, []);


  const handleAnalyze = async () => {
    if (!url.trim()) return;

    setLoading(true);
    setCurrentStep(2);

    //Extraio as informações da API
    const result = await extractWattsFromUrlAction(url);
    setLoading(false);

    console.log('RESPOSTA DA IA:', result);

    //O que a API me retonna?
    //a potência encontrada, ou a potência sugerida e, por fim, a última
    //mas porque eu preciso de 3 variáveis para armazenar essas informações?
    if (result.success) {
      const potenciaEncontrada = result.watts ?? 0;
      const potenciaSugerida = result.wattsSugerido ?? 0;
      const potenciaFinal = potenciaEncontrada > 0 ? potenciaEncontrada : potenciaSugerida;

      alert(`Sucesso! Potência extraída: ${potenciaFinal}W`);
      router.push(`/deviceRegister?potencia=${potenciaFinal}`);
      //envio como parâmetro para deviceRegister
      //deivceRegister então puxa a potência via useSearchPRAM S
    } else {
      alert(result.message?.description || 'Ocorreu um erro ao processar a URL. Tente novamente.');
      setCurrentStep(1);
    }
  };

  //Função para o usuário escolher o exemplo caso deseje
  const handleExample = (example: string) => {
    if (example.includes('Monitor LG')) {
      setUrl('https://www.amazon.com.br/Monitor-LG-27-Full-HD/dp/B099777N3Q');
    } else if (example.includes('PC Gamer')) {
      setUrl('https://www.kabum.com.br/produto/475485/computador-gamer-facil-intel-core-i5-16gb-ram-ssd-480gb-preto');
    }
  };

  // Evita a renderização do HTML até que a página esteja carregada no cliente (evita Hydration Mismatch)
  if (!isMounted) {
    return null; 
  }

  return (
    <PageWrapper>

      <Card>
        <CardHeader>
          <CardIcon>🔗</CardIcon>
          <div>
            <CardTitle>Cadastro inteligente</CardTitle>
            <CardSubtitle>Cole o link do produto — a IA faz o resto</CardSubtitle>
          </div>
        </CardHeader>

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

        <FormGroup>
          <FormLabel>Link do produto (Amazon, Kabum, Pichau...)</FormLabel>
          <UrlRow>
            <UrlInput
              type="url"
              placeholder="https://www.amazon.com.br/Monitor-LG..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
            />
            
            <Button 
              disabled={url.trim().length === 0 || loading} 
              onClick={handleAnalyze}
            >
              {loading ? 'Analisando...' : 'Analisar'}
            </Button>
          </UrlRow>
        </FormGroup>

        <ExamplesRow>
          {EXAMPLES.map((ex) => (
            <ExampleChip key={ex} onClick={() => handleExample(ex)}>
              {ex}
            </ExampleChip>
          ))}
        </ExamplesRow>

        <div>
          <Button onClick={() => router.push('/deviceList')}>
            Cancelar
          </Button>
        </div>
      </Card>
    </PageWrapper>
  );
}