import { colors } from '@/components/theme';
import styled from 'styled-components';

export const ListBillingItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border: 1px solid ${colors.mediumGray}60;
  border-radius: 12px;
  transition: 0.2s;

  &:hover {
    border: 1px solid ${colors.cyanBlue};
    box-shadow: 0px 4px 4px ${colors.black}25;
  }
`;

export const BillingDateContainer = styled.div`
  background-color: ${colors.lightGray};
  padding: 8px 12px;
  justify-items: center;
  border-radius: 10px;
`;

export const BillingInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4px;
`;
