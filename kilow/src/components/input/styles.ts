import styled from 'styled-components';
import { colors } from '../theme';

export const InputStyle = styled.input`
  height: 32px;
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
