import { StyledText } from '@/app/(public)/text';
import { InputStyle, PasswordVisibilityButton } from './styles';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { colors } from '../theme';

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
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const isPassword = type === 'password';

  const inputType = isPassword && mostrarSenha ? 'text' : type;
  return (
    <div
      style={{
        gap: 12,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {label && (
        <StyledText color="black" size={16} weight={400}>
          {label}
          {required && ' *'}
        </StyledText>
      )}
      <InputStyle
        type={inputType}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {isPassword && (
        <PasswordVisibilityButton
          aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
          onClick={() => setMostrarSenha(!mostrarSenha)}
        >
          {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
        </PasswordVisibilityButton>
      )}
    </div>
  );
};

export default StyledInput;
