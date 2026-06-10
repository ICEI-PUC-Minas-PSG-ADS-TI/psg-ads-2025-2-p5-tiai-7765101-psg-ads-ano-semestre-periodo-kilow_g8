import styled from 'styled-components';

export const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
`;

export const Card = styled.div`
  max-width: 560px;
  margin: 40px auto;
  padding: 28px;
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const CardIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background-color: #fff3bf;
  font-size: 20px;
`;

export const CardTitle = styled.p`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #212529;
`;

export const CardSubtitle = styled.p`
  margin: 0;
  font-size: 13px;
  color: #868e96;
`;

export const StepRow = styled.div`
  display: flex;
  align-items: center;
`;

export const StepItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StepCircle = styled.div<{ $active: boolean; $done: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
  background-color: ${({ $active, $done }) =>
    $done ? '#2f9e44' : $active ? '#212529' : '#e9ecef'};
  color: ${({ $active, $done }) => ($active || $done ? '#ffffff' : '#868e96')};
`;

export const StepLabel = styled.span<{ $active: boolean }>`
  font-size: 13px;
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  color: ${({ $active }) => ($active ? '#212529' : '#adb5bd')};
  white-space: nowrap;
`;

export const StepDivider = styled.div`
  flex: 1;
  height: 1px;
  background-color: #dee2e6;
  margin: 0 10px;
  min-width: 24px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FormLabel = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: #495057;
`;

export const UrlRow = styled.div`
  display: flex;
  gap: 10px;
`;

export const UrlInput = styled.input`
  flex: 1;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  font-size: 14px;
  color: #212529;
  outline: none;

  &:focus {
    border-color: #2f7a3a;
    box-shadow: 0 0 0 2px rgba(47, 122, 58, 0.15);
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

export const ExamplesRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const ExampleChip = styled.button`
  padding: 6px 14px;
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  font-size: 13px;
  color: #495057;
  cursor: pointer;

  &:hover {
    background-color: #f1f3f5;
    border-color: #adb5bd;
  }
`;