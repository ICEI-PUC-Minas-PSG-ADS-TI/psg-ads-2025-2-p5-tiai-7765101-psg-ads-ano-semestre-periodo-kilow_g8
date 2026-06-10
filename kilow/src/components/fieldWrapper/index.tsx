import { ReactNode } from 'react';
import { StyledText } from '@/components/text';
import { InputWrapperContainer } from './style';
import { ColorsType, inputVariants } from '../theme';

interface IFieldWrapperProps {
  label: string;
  isRequired?: boolean;
  description?: string;
  children: ReactNode;
  variant: 'big' | 'small';
}

const FieldWrapper = ({
  label,
  isRequired,
  description,
  children,
  variant,
}: IFieldWrapperProps) => {
  const { labelColor, labelFontSize, labelFontWeight } =
    variant === 'small' ? inputVariants.small : inputVariants.large;
  return (
    <InputWrapperContainer>
      <StyledText
        color={labelColor as ColorsType}
        size={labelFontSize}
        weight={labelFontWeight}
      >
        {label} {isRequired && '*'}
      </StyledText>
      {description && (
        <StyledText color="darkTextGray" size={12} weight={350}>
          {description}
        </StyledText>
      )}
      {children}
    </InputWrapperContainer>
  );
};

export default FieldWrapper;
