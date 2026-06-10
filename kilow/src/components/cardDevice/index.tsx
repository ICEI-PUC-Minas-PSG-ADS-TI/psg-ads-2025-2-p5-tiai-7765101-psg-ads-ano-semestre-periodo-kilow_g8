import React from 'react';
import {Container, DivNome, DivCategoria, Texto, DivCadastro, DivCusto
} from "./style"

//Finalizar esses componentes
//Adicionar outros componentes para completar a página

function CardDevice() {
  const dispositivos = ['PC Desktop', 'Ar-Condicionado', 'Monitor'];
  const palavra = dispositivos[0];
  const palavraEncurtada = palavra
    .split(' ')
    .map((palavra) => palavra.charAt(0).toUpperCase())
    .join('');

  function CustoTotal({valorContaDeEnergia}: valorContaDeEnergia) {
    const potencia = 3;
    const horasDiarias = 8;
    const dias = 5;
    let h = horasDiarias * dias;
    let consumoMensalEmWatt = potencia * h;
    let valorConvertidoParaWhats = consumoMensalEmWatt / 1000;
    let custoTotal = valorConvertidoParaWhats * valorContaDeEnergia;
    console.log(custoTotal);
    return custoTotal;
  }

  interface valorContaDeEnergia {
    valorContaDeEnergia: number;
  }
  
    const categories = [
        "Computadores",
        "Climatização",
        "Monitores",
        "Áudio",
        "Redes"
    ]

  return (
    <Container>
      {/* Nome  */}
      <DivNome>
        <p> {palavraEncurtada} </p>
      </DivNome>

      {/* Categorias */}
      <DivCategoria>
        <p style={{ color: '#2f4f4f' }}> {categories[0]} </p>
      </DivCategoria>
      {/* Dados do cadastro */}
      <DivCadastro>
        <Texto>
          300W(P)
        </Texto>
        <Texto>
          3h/dia(Consumo diário)
        </Texto>
        <Texto>
          5 dias(Dias)
        </Texto>
      </DivCadastro>

      {/* Custo Total */}
      <DivCusto
        style={{ }}
      >
        <p> {CustoTotal(3)}</p>
      </DivCusto>
    </Container>
  );
}

export default CardDevice;