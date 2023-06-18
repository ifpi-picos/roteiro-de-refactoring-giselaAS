const { readFileSync } = require('fs');

class ServicoCalculoFatura {

  getPeca(pecas, apre) {
      return pecas[apre.id];
    }

  calcularCredito(pecas, apre) {
      let creditos = 0
      creditos += Math.max(apre.audiencia - 30, 0);
      if (this.getPeca(pecas, apre).tipo === "comedia")
        creditos += Math.floor(apre.audiencia / 5);
      return creditos;
  }

  calcularTotalCreditos(pecas, apresentacoes) {
      let creditos = 0
      for (let apre of apresentacoes) {
        creditos += this.calcularCredito(pecas, apre)
      }
      return creditos
  }
  calcularTotalApresentacao(pecas, apre) {
    let total = 0;
    switch (this.getPeca(pecas, apre).tipo) {
      case "tragedia":
        total = 40000;
        if (apre.audiencia > 30) {
          total += 1000 * (apre.audiencia - 30);
        }
        break;
      case "comedia":
        total = 30000;
        if (apre.audiencia > 20) {
          total += 10000 + 500 * (apre.audiencia - 20);
        }
        total += 300 * apre.audiencia;
        break;
      default:
        throw new Error(`Peça desconhecia: ${getPeca(pecas, apre).tipo}`); z
    }
    return total;
}

  calcularTotalFatura(pecas, apresentacoes) {
    let total = 0
    for (let apre of apresentacoes) {
      total += this.calcularTotalApresentacao(pecas, apre)
    }
    return total
  }
}
    
const calc = new ServicoCalculoFatura();

function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR",
    {
      style: "currency", currency: "BRL",
      minimumFractionDigits: 2
    }).format(valor/100);
  }

  function getPeca(pecas, apre) {
    return pecas[apre.id];
  }

function gerarFaturaStr (fatura, pecas, calc) {
  let faturaStr = `Fatura ${fatura.cliente}\n`;
  for (let apre of fatura.apresentacoes) {
    faturaStr += `  ${getPeca(pecas, apre).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(pecas, apre))} (${apre.audiencia} assentos)\n`;
  }
  faturaStr += `Valor total: ${formatarMoeda(calc.calcularTotalFatura(pecas, fatura, apresentacoes))}\n`;
  faturaStr += `Créditos acumulados: ${calc.calcularTotalCreditos(pecas, fatura, apresentacoes)} \n`;
  return faturaStr;
}

/*
function gerarFaturaHTML(fatura, pecas) {

  let faturaHTML = `<html>
  <p> Fatura ${fatura.cliente} </p>
  <ul>
`

  for (apre of fatura.apresentacoes) {
    faturaHTML += `   <li>  ${getPeca(apre).nome}: ${formatarMoeda(calcularTotalApresentacao(apre))} (${apre.audiencia} assentos) </li>${fatura.apresentacoes.indexOf(apre) != fatura.apresentacoes.length - 1 && '\n'}`
  }

  faturaHTML += `
  </ul>
  <p> Valor total: ${formatarMoeda(calcularTotalFatura(fatura))} </p>
  <p> Créditos acumulados: ${calcularTotalCreditos(fatura)} </p>
</html> 
  `;
  return faturaHTML;
}
*/

const faturas = JSON.parse(readFileSync('./faturas.json'));
const pecas = JSON.parse(readFileSync('./pecas.json'));
const faturaStr = gerarFaturaStr(faturas, pecas, calc);
//const faturaHTML = gerarFaturaHTML(faturas, pecas);
console.log(faturaStr);
//console.log(faturaHTML);
