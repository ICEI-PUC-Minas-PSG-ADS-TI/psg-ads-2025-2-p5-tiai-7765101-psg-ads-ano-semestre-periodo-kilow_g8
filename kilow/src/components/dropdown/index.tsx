import { Select } from '@base-ui/react';
import { useState } from 'react';
import { DropdownItem, DropdownPopup, InputTrigger } from './style';

interface IDropdownOption {
  optionValue: string;
  optionName: string;
  optionKey?: any;
}

interface DropdownProps {
  options: IDropdownOption[];
  placeholder: string;
  onSelect(selectedValue: string): void;
  selectedValue: string;
}

const Dropdown = ({
  placeholder,
  options,
  onSelect,
  selectedValue,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Select.Root
      value={selectedValue}
      onValueChange={(value) => onSelect(value as string)}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <Select.Trigger render={<InputTrigger isSelected={isOpen} />}>
        <Select.Value placeholder={placeholder} />
      </Select.Trigger>

      <Select.Portal>
        <Select.Positioner
          alignItemWithTrigger={false}
          sideOffset={4}
          align="start"
          side="bottom"
        >
          <Select.Popup render={<DropdownPopup />}>
            <Select.List style={{ margin: 0, padding: 0 }}>
              {options.map((option) => (
                <Select.Item
                  key={option.optionKey || option.optionValue}
                  value={option.optionValue}
                  render={<DropdownItem />}
                >
                  <Select.ItemText>{option.optionName}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
};

export default Dropdown;
