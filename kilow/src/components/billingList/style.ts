import styled from 'styled-components';
import { colors } from '../theme';

export const BillingListContainer = styled.div`
  background-color: ${colors.backgroundWhite};
  padding: 20px;
  border-radius: 14px;
  border: 1px solid ${colors.mediumGray}60;
  gap: 12px;
  display: flex;
  flex-direction: column;
  max-height: 60vh;
  overflow-y: auto;
`;

export const OutsideModalContainer = styled.div`
  background-color: ${colors.darkBlue}50;
  backdrop-filter: blur(1px);
  z-index: 10;
  position: absolute;
  display: flex;
  inset: 0;
`;

export const ModalContainer = styled.div`
  background-color: ${colors.backgroundWhite};
  margin: auto;
  border-radius: 12px;
  padding: 24px;
  width: 25%;
`;

export const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
