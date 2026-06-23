import styled from 'styled-components';
import { NumericFormat } from 'react-number-format';
import { colors } from '../theme';

export const StyledSpecificInput = styled(NumericFormat)`
    height: 36px;
    border-radius: 12px;
    border: 2px solid ${colors.lightGray};
    background-color: ${colors.lightGray};
    padding: 12px;
    font-size: 16px;
    
    outline: none;
    
    &:focus {
        border: 2px solid ${colors.mediumGray};
    }
    
    &::placeholder {
        color: ${colors.mediumGray};
        opacity: 1;
    }
}
`;
