import styled from 'styled-components';
import { colors } from '../theme';

interface InputTriggerProps {
  isSelected: boolean;
}

export const InputTrigger = styled.button<InputTriggerProps>`
  width: 100%;
  height: 36px;
  padding: 8px 12px;
  background-color: ${colors.lightGray};
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  text-align: left;
  transition: border 0.2s ease;

  ${({ isSelected }) =>
    isSelected
      ? ` 
      outline: none;
      border: 1px solid ${colors.lightGray}; 
      border: 2px solid ${colors.mediumGray};
      `
      : `border: 1px solid ${colors.lightGray};`}

  &[data-placeholder] {
    color: ${colors.darkGray}80;
  }
`;

export const DropdownItem = styled.li`
  padding: 8px 12px;
  color: ${colors.backgroundGray};
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  list-style: none;

  &[data-highlighted] {
    background-color: ${colors.cyanBlue}25;
  }

  &[data-selected] {
    background-color: ${colors.lightGray}25;
    font-weight: bold;
  }
`;

export const DropdownPopup = styled.div`
  background-color: ${colors.darkBlue};
  border-radius: 4px;
  padding: 0;
  width: var(--anchor-width);
  max-height: 160px;
  overflow-y: auto;
  box-shadow: 0px 8px 16px ${colors.black}25;
  border: 1px solid ${colors.lightGray};
  z-index: 50;
  outline: none;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.cyanBlue}80;
    border-radius: 4px;
  }
`;
