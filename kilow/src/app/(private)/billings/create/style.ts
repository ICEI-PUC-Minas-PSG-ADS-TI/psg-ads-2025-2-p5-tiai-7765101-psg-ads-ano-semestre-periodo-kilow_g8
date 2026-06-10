import { colors } from '@/components/theme';
import styled from 'styled-components';

export const BillingFormContainer = styled.div<{ $width?: string }>`
  background-color: ${colors.backgroundWhite};
  border: 0.25px solid ${colors.darkGray}60;
  border-radius: 16px;
  padding: 16px;
  max-width: ${({ $width }) => ($width ? $width : 'auto')};
  height: fit-content;
`;

export const OptionsContainer = styled.div`
  background-color: ${colors.lightGray};
  display: flex;
  gap: 4px;
  padding: 4px;
  margin-bottom: 12px;
  border-radius: 8px;
`;

export const InfoContainer = styled(BillingFormContainer)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px 24px;
`;
