import styled from 'styled-components';
import { colors, ColorsType } from '../theme';

export const InfoBoxContainer = styled.div<{
  topBorderColor: ColorsType;
  fillContainer?: boolean;
}>`
  border: 1px solid ${colors.mediumGray}60;
  border-radius: 8px;
  border-top: 3px solid
    ${({ topBorderColor }) => colors[topBorderColor] ?? colors.cyanBlue};
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  ${({ fillContainer }) => fillContainer && 'flex: 1'};
  background-color: ${colors.backgroundWhite};
`;
