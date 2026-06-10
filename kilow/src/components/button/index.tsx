import { ButtonHTMLAttributes, ReactNode } from 'react';
import { StyledButton } from './style';
import { ButtonSizes, ButtonVariants } from '../theme';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariants;
  size?: ButtonSizes;
}

const Button = ({
  children,
  variant = 'darkBlue',
  size = 'normal',
  ...rest
}: ButtonProps) => {
  return (
    <StyledButton $variant={variant} $size={size} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;
