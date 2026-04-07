import styled from 'styled-components';
import { ColorsType, colors } from '@/components/theme';
export interface ITextProps {
  color: ColorsType;
  weight: number;
  size: number;
  textAlign?: string;
  maxWidth?: number;
}

export const StyledText = styled.div<ITextProps>`
  color: ${(props) => colors[props.color]};
  font-weight: ${(props) => props.weight};
  font-size: ${(props) => props.size}px;
  text-align: ${(props) => props.textAlign || 'left'};
  ${(props) => props.maxWidth && `max-width: ${props.maxWidth}px;`}
`;
