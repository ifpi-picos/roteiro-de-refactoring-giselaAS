const { readFileSync } = require('fs');

const Repositorio = require('./Repositorio.js');
const ServicoCalculoFatura = require('./servico.js');
const gerarFaturaStr = require('./apresentacao.js');
    
const calc = new ServicoCalculoFatura(new Repositorio);

const faturas = JSON.parse(readFileSync('./faturas.json'));
const faturaStr = gerarFaturaStr(faturas, calc);
//const faturaHTML = gerarFaturaHTML(faturas, pecas);
console.log(faturaStr);
//console.log(faturaHTML);
