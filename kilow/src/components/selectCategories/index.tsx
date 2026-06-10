// import Select from 'react-select';
// import makeAnimated from 'react-select/animated';
// import { DivContainer, Label } from './style';

// const animatedComponents = makeAnimated();

// interface OptionType {
//   label: string;
//   value: string;
// }

// interface AnimatedMultiProps {
//   data: OptionType[];
//   label: string;
//   onChange?: (values: string[]) => void; // ← adicionado
// }

// export default function AnimatedMulti({ data, label, onChange }: AnimatedMultiProps) {
//   const defaultValues = data.filter(
//     option => option.value === "Segunda-feira" || option.value === "Sexta-feira"
//   );

//   return (
//     <DivContainer>
//       <Label>{label}</Label>
//       <Select
//         closeMenuOnSelect={false}
//         components={animatedComponents}
//         defaultValue={defaultValues}
//         isMulti
//         options={data}
//         placeholder="Selecione os dias..."
//         noOptionsMessage={() => "Nenhuma opção encontrada"}
//         onChange={(selected) =>
//           onChange?.(selected.map((opt) => opt.value)) // ← adicionado
//         }
//       />
//     </DivContainer>
//   );
// }

import { StyledSelect } from './style';

const ALL_CATEGORIES = 'Todas categorias';

const categories = [
  'Computadores',
  'Climatização',
  'Monitores',
  'Áudio',
  'Redes',
];

interface SelectCategoriesProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function SelectCategories({ value, onChange }: SelectCategoriesProps) {
  return (
    <StyledSelect
      value={value ?? ALL_CATEGORIES}
      onChange={(e) => onChange?.(e.target.value)}
    >
      <option value={ALL_CATEGORIES}>{ALL_CATEGORIES}</option>
      {categories.map((cat) => (
        <option value={cat} key={cat}>
          {cat}
        </option>
      ))}
    </StyledSelect>
  );
}