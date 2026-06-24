import styled from 'styled-components';

export const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
  padding-bottom: 40px;
`;

export const PageTitle = styled.h1`
  margin: 32px 24px 4px;
  font-size: 22px;
  font-weight: 700;
  color: #212529;
`;

export const PageSubtitle = styled.p`
  margin: 0 24px 24px;
  font-size: 14px;
  color: #868e96;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  max-width: 860px;
  margin: 0 auto;
  padding: 0 24px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

/* ── Form card ── */
export const FormCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 14px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`;

export const FormLabel = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: #495057;
`;

export const FormInput = styled.input`
  height: 40px;
  padding: 0 12px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  font-size: 14px;
  color: #212529;
  background-color: #ffffff;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:focus {
    border-color: #2f7a3a;
    box-shadow: 0 0 0 2px rgba(47, 122, 58, 0.15);
  }

  &::placeholder {
    color: #adb5bd;
  }

  /* Remove setas do input number */
  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const FormSelect = styled.select`
  height: 40px;
  padding: 0 12px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  font-size: 14px;
  color: #212529;
  background-color: #ffffff;
  outline: none;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23868e96' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:focus {
    border-color: #2f7a3a;
    box-shadow: 0 0 0 2px rgba(47, 122, 58, 0.15);
  }
`;

export const FormRow = styled.div`
  display: flex;
  gap: 12px;
`;

export const FormHint = styled.p`
  margin: 0;
  font-size: 11px;
  color: #adb5bd;
`;

/* ── Preview card ── */
export const PreviewCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 14px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

export const PreviewTitle = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #868e96;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const PreviewWrapper = styled.div`
  /* Limita o card ao tamanho natural, sem esticar */
  align-self: flex-start;
  width: 100%;
`;

/* ── Footer ── */
export const FooterRow = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;