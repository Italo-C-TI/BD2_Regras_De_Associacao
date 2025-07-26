const fs = require("fs");

// === CONFIGURAÇÕES ===
const SUPORTE_MINIMO = 0.3; 
const CONFIANCA_MINIMA = 0.6;  

// === LEITURA DA BASE DE DADOS ===
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
console.log("📊 Base de dados carregada com", data.length, "transações.");
console.log("📌 Itens considerados: leite, café, cerveja, pão, manteiga, arroz, feijão\n");


// Gera todos os pares de itens possíveis
function getItemsets(transactions) {
  const items = new Set();
    transactions.forEach(transaction => {
        Object.keys(transaction).forEach(item => {
      if (transaction[item] === "sim") items.add(item);
    });
  });

  const arrayItems = [...items];
  const results = [];

  for (let i = 0; i < arrayItems.length; i++) {
    for (let j = i + 1; j < arrayItems.length; j++) {
      results.push([arrayItems[i], arrayItems[j]]);
    }
  }
  return results;
}

// Calcula o suporte de um itemset
function calcularSuporte(itemset, transactions) {
  let count = 0;
  transactions.forEach(t => {
    const temTodos = itemset.every(item => t[item] === "sim");
    if (temTodos) count++;
  });
  //console.log("count", count, "itemset", itemset);
  return count / transactions.length;
}

// Calcula a confiança de A => B
function calcularConfianca(A, B, transactions) {
  const suporteA = calcularSuporte(A, transactions);
  const suporteAB = calcularSuporte([...A, ...B], transactions);
  return suporteA === 0 ? 0 : suporteAB / suporteA;
}

// === EXECUÇÃO DO ALGORITMO APRIORI SIMPLIFICADO ===
console.log("🔍 Iniciando análise com suporte mínimo de", SUPORTE_MINIMO * 100 + "% e confiança mínima de", CONFIANCA_MINIMA * 100 + "%...\n");

const transacoes = data;
const itemsets = getItemsets(transacoes);
const regras = [];

itemsets.forEach(itemset => {
  const suporte = calcularSuporte(itemset, transacoes);
  if (suporte >= SUPORTE_MINIMO) {
    const [A, B] = itemset;
    const confiancaAB = calcularConfianca([A], [B], transacoes);
    const confiancaBA = calcularConfianca([B], [A], transacoes);

    if (confiancaAB >= CONFIANCA_MINIMA) {
      regras.push({ regra: `${A} => ${B}`, suporte, confianca: confiancaAB });
    }
    if (confiancaBA >= CONFIANCA_MINIMA) {
      regras.push({ regra: `${B} => ${A}`, suporte, confianca: confiancaBA });
    }
  }
});

if (regras.length === 0) {
  console.log("⚠️ Nenhuma regra encontrada com os critérios definidos.");
} else {
  console.log("✅ Regras de associação encontradas:\n");
  regras.forEach((r, i) => {
    console.log(`Regra ${i + 1}:`);
    console.log(`➡️  ${r.regra}`);
    console.log(`   - Suporte: ${(r.suporte * 100).toFixed(1)}%`);
    console.log(`   - Confiança: ${(r.confianca * 100).toFixed(1)}%\n`);
  });
}
