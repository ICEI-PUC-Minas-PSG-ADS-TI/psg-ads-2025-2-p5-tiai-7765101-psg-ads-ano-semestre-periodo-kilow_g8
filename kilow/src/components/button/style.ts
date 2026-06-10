import styled from 'styled-components';
import {
  ButtonSizes,
  buttonsSizesProps,
  buttonsVariantsProps,
  ButtonVariants,
  colors,
} from '../theme';

interface StyledButtonProps {
  $variant: ButtonVariants;
  $size: ButtonSizes;
}

export const StyledButton = styled.button<StyledButtonProps>`
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: opacity 0.2s;
  font-family: inherit;
  border-radius: 8px;

  ${(props) =>
    `
      padding: ${buttonsSizesProps[props.$size].padding}px;
      font-size: ${buttonsSizesProps[props.$size].fontSize}px;
      font-weight: ${buttonsSizesProps[props.$size].fontWeight};

      background-color:  ${buttonsVariantsProps[props.$variant].backgroundColor};
      color:  ${buttonsVariantsProps[props.$variant].color};
    `}

  &:hover:not(:disabled) {
    opacity: 0.9;
    cursor: pointer;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
