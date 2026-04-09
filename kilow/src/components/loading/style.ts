import styled, { keyframes } from 'styled-components';
import { Lightbulb, Loader2 } from 'lucide-react';

export const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const LoadingContainer = styled.div`
  display: flex;
  width: fit-content;
  height: fit-content;
  align-items: center;
  justify-content: center;
  borderradius: 100%;
`;

export const amberGlow = keyframes`
  0%, 100% {
    opacity: 0.3;
    color: #b59410; // Âmbar apagado
    filter: drop-shadow(0 0 0px #ffd60a00);
  }
  50% {
    opacity: 1;
    color: #ffd60a; // Ouro aceso
    filter: drop-shadow(0 0 15px #ffd60ae6);
  }
`;

export const MiniOuterSpinner = styled(Loader2)`
  animation: ${spin} 1s linear infinite;
`;

export const InnerBulb = styled(Lightbulb)`
  position: relative;
  color: #b59410;

  animation: ${amberGlow} 2s ease-in-out infinite;
`;
