import styled, { keyframes } from 'styled-components';
import { Toast } from '@base-ui/react/toast';

export const slideIn = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

export const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

export const StyledViewport = styled(Toast.Viewport)`
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 360px;
  max-width: 100vw;
  z-index: 9999;
  list-style: none;
  outline: none;
`;

export const StyledRoot = styled(Toast.Root)`
  background: white;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  /* Animações */
  &[data-state='open'] {
    animation: ${slideIn} 200ms ease-out;
  }
  &[data-state='closed'] {
    animation: ${fadeOut} 150ms ease-in;
  }
`;

export const StyledTitle = styled(Toast.Title)`
  font-weight: 600;
  font-size: 0.95rem;
  color: #1a202c;
  margin-bottom: 4px;
`;

export const StyledDescription = styled(Toast.Description)`
  font-size: 0.875rem;
  color: #718096;
  margin: 0;
  display: flex;
`;

export const StyledClose = styled(Toast.Close)`
  background: none;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  padding: 4px;
  margin-left: 12px;
  border-radius: 6px;
  font-size: 1.2rem;
  transition: all 0.2s;

  &:hover {
    background: #f7fafc;
    color: #4a5568;
  }
`;
