import styled from 'styled-components';
import { colors } from '../theme';

export const InputStyle = styled.input`
  height: 52px;
  border-radius: 12px;
  border: 2px solid ${colors.lightGray};
  outline: ${colors.lightGray};
  background-color: ${colors.lightGray};
  padding: 12px;
  font-size: 16px;

  &:focus {
    border: 2px solid ${colors.darkGray};
  }

  &::placeholder {
    color: ${colors.darkGray};
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
  color: ${colors.darkGreen};
`;
