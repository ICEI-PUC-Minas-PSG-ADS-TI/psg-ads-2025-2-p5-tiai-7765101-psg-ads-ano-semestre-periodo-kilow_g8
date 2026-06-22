import styled from 'styled-components';
import { colors, ColorsType } from '../theme';

export const FormLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 24px;
`;

export const EffectiveTariff = styled.div<{ color?: ColorsType }>`
  background-color: ${({ color }) =>
    color ? colors[color] : colors.yellow + 10};
  border: 0.5px solid
    ${({ color }) => (color ? colors[color] : colors.yellow)}80;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 8px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-self: flex-end;
  margin-top: 12px;
`;
