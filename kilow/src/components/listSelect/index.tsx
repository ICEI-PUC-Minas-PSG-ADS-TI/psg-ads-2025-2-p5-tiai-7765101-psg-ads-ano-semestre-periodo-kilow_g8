import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { DivContainer, Label } from './style';

const animatedComponents = makeAnimated();

interface OptionType {
  label: string;
  value: string;
}

interface AnimatedMultiProps {
  data: OptionType[];
  label: string;
}

export default function AnimatedMulti({ data, label }: AnimatedMultiProps) {
  const defaultValues = data.filter(
    option => option.value === "Segunda-feira" || option.value === "Sexta-feira"
  );

  return (
    <DivContainer>
      <Label>{label}</Label>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        defaultValue={defaultValues} 
        isMulti
        options={data}
        placeholder="Selecione os dias..."
        noOptionsMessage={() => "Nenhuma opção encontrada"}
      />
    </DivContainer>
  );
}