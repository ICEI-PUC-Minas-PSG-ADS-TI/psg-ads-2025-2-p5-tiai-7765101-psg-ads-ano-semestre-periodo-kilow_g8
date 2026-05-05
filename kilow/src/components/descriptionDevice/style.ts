import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #eeebe4;
  border: 3px solid #dbdad8;
  border-radius: 10px;
  padding: 10px;
  margin: 5px;
  width: 810px;
  gap: 30px;
`;

export const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 50px;
`;

export const DivText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const DivIconDevice = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 51px;
  background-color: #2d5d7b;
  padding: 5px;
  border-radius: 70%;
`;

export const DivCharacteristics = styled.div`
  display: flex;
  gap: 30px;
`;

export const Text = styled.div`
  font-size: 20px;
  font-family: 'Open Sans';
`;

export const Button = styled.div`
  font-size: 15px;
  color: #e76f51;
`;
