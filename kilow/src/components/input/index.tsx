import { StyledText } from '@/components/text';
import { InputContainer, InputStyle, PasswordVisibilityButton } from './styles';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export interface IStyledInput {
  value: string;
  onChange(value: string): void;
  type: string;
  placeholder: string;
  label?: string;
  required?: boolean;
  height?: number;
}

const StyledInput = ({
  value,
  onChange,
  type,
  placeholder,
  label,
  required,
  height,
}: IStyledInput) => {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const isPassword = type === 'password';

  const inputType = isPassword && mostrarSenha ? 'text' : type;
  return (
    <InputContainer>
      {label && (
        <StyledText color="black" size={16} weight={400}>
          {label}
          {required && ' *'}
        </StyledText>
      )}
      <InputStyle
        type={inputType}
        min={inputType === 'number' ? 2000 : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        height={height}
      />
      {isPassword && (
        <PasswordVisibilityButton
          type="button"
          aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
          onClick={() => setMostrarSenha(!mostrarSenha)}
        >
          {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
        </PasswordVisibilityButton>
      )}
    </InputContainer>
  );
};

export default StyledInput;
