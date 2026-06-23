import { NumberFormatValues, NumericFormat } from 'react-number-format';
import { StyledSpecificInput } from './style';

interface SpecificInputProps {
  value?: number;
  onChange(newValue?: number): void;
  placeholder: string;
  type: 'Specific' | 'kWh';
}

const SpecificInput = ({
  value,
  onChange,
  placeholder,
  type,
}: SpecificInputProps) => {
  return (
    <StyledSpecificInput
      value={value ?? ''}
      onValueChange={(values: NumberFormatValues) => {
        onChange(values.floatValue);
      }}
      placeholder={placeholder}
      thousandSeparator=","
      decimalSeparator="."
      prefix={type === 'Specific' ? 'R$' : ''}
      suffix={type === 'Specific' ? '' : ' kWh'}
      decimalScale={2}
      fixedDecimalScale
      allowNegative={false}
    />
  );
};

export default SpecificInput;
