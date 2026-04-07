import { StyledText } from '@/app/(public)/text';
import { InputStyle } from './styles';

export interface IStyledInput {
  value: string;
  onChange(value: string): void;
  type: string;
  placeholder: string;
  label?: string;
  required?: boolean;
}

const StyledInput = ({
  value,
  onChange,
  type,
  placeholder,
  label,
  required,
}: IStyledInput) => {
  return (
    <div
      style={{
        gap: 12,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {label && (
        <StyledText color="black" size={16} weight={400}>
          {label}
          {required && ' *'}
        </StyledText>
      )}
      <InputStyle
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default StyledInput;
