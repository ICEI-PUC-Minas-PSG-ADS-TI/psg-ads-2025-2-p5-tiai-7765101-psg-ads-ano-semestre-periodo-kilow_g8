import { colors } from '@/components/theme';
import styled from 'styled-components';

export const NewBillingButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
  margin-top: -40px;
`;

export const BillingsInfosContainer = styled.div`
  display: flex;
  gap: 24px;
  align-self: end;
`;

export const HighlightedText = styled.b`
  background-color: ${colors.backgroundWhite};
  padding: 4px;
  font-size: 12px;
  border-radius: 10px;
`;

export const EmptyListContainer = styled.div`
  justify-content: center;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-toppx: 16;
`;
