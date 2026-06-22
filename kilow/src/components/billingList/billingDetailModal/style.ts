import { X } from 'lucide-react';
import styled from 'styled-components';
import { colors } from '../../theme';

export const ModalHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const InfoBoxContainer = styled(ModalHeaderContainer)`
  gap: 12px;
`;

export const CloseModalIcon = styled(X)`
  cursor: pointer;
  border-radius: 2px;

  &:hover {
    background-color: ${colors.cyanBlue}60;
  }
`;
