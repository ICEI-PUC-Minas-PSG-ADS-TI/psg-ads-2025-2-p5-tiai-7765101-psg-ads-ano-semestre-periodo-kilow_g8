import styled from 'styled-components';

export const DivContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 60px;
    margin: 5px;
`;

export const ContainerRegister = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 60px;
    margin: 5px;
    padding: 10px;

`;

export const ContainerTitle = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #FFF5E8;
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 20px;
    width: 100%;
`;

export const ContainerTitleRegister = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start; /* Alterado para flex-start para melhor compatibilidade */
    width: 100%;
    height: 100vh;
`;

export const Title = styled.p`
    font-family: 'Open Sans', sans-serif;
    font-size: 48px; /* Aspas removidas */
    font-weight: bold; /* Aspas removidas */
    margin: 0px; /* Aspas removidas e adicionado ; */
`;

export const SubTitle = styled.p`
    font-family: 'Open Sans', sans-serif;
    font-size: 18px;
    color: #9E9E9E;
`;

export const Text = styled.p`
    font-family: 'Open Sans', sans-serif;
    font-size: 24px;
    color: #FFFFFF;
`;

export const ContainerSectionOne = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Open Sans', sans-serif;
    gap: 60px;
`;

export const ContainerSectionTwo = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Open Sans', sans-serif;
    gap: 60px;
`;

export const ContainerImage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #2D5D7B;
    border-radius: 30px;
    width: 760px;
    height: 50%;
`;

export const StyledButton = styled.button`
  background-color: #2D5D7B;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  width: 100%;
  margin-top: 16px;

  &:hover {
    background-color: #1a3a4f;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #9E9E9E;
    cursor: not-allowed;
    transform: none;
  }
`;

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;

  /* Estilização da label que fica acima da lista */
  label {
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
    color: #333;
  }
`;