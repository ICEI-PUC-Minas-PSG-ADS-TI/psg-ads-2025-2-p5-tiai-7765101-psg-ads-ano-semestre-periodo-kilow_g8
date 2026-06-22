import styled from 'styled-components';
import { colors } from '../theme';

export const ImageUploadContainer = styled.div`
  background-color: ${colors.lightOrange};
  border-radius: 12px;
  padding: 32px 20px;
  align-items: center;
  border: 2px dashed ${colors.lightGray};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition: 0.15s;

  &:hover {
    background-color: ${colors.cyanBlue}20;
    border-color: ${colors.darkBlue};
  }
`;
export const InfoAlert = styled.div`
  background-color: ${colors.cyanBlue}15;
  display: flex;
  gap: 4px;
  border-radius: 8px;
  padding: 16px;
  align-items: center;
`;
