import Link from 'next/link';
import styled from 'styled-components';
import { colors } from '../theme';
import { ITextProps, StyledText } from '@/components/text';

interface ILinkRouteText extends ITextProps {
  isSelected: boolean;
}

export const LinkRouteDiv = styled(Link)`
  padding-inline: 12px;
  cursor: pointer;
  color: ${colors.white};
  text-decoration: none;

  &:hover {
    opacity: 0.8;
  }
`;

export const LinkRouteText = styled(StyledText)<ILinkRouteText>`
  ${(props) => props.isSelected && `background-color: ${colors.yellow}33`};
  border-radius: 10px;
  padding: 6px 12px 6px 12px;
`;

export const VerticalLine = styled.div`
  width: 1px;
  height: 3.5vh;
  background-color: ${colors.white};
  border-radius: 100;
`;
