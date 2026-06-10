import styled from 'styled-components';
import { colors } from '../theme';

interface InputStyleProps {
  height?: number;
  width?: number;
}

export const InputStyle = styled.input<InputStyleProps>`
  height: ${(props) => (props.height ? props.height : '52')}px;
  border-radius: 12px;
  border: 2px solid ${colors.lightGray};
  background-color: ${colors.lightGray};
  padding: 12px;
  font-size: 16px;
  
  outline: none;

  &:focus {
    border: 2px solid ${colors.darkGray};
  }

  &::placeholder {
    color: ${colors.darkTextGray}80;
    opacity: 1;
  }
}
`;

export const PasswordVisibilityButton = styled.button`
  position: absolute;
  background: transparent;
  right: 1%;
  top: 30%;
  border: none;
  cursor: pointer;
  color: ${colors.darkBlue};
`;

export const InputContainer = styled.div`
  gap: 12px;
  display: flex;
  flex-direction: column;
  position: relative;
`;
