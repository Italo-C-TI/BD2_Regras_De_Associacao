# Regras de Associação com Algoritmo Apriori (Node.js)

Este projeto implementa um algoritmo simplificado de **Regras de Associação**, utilizando o método **Apriori** para identificar padrões entre itens em transações. O código é desenvolvido em **Node.js** e trabalha com arquivos de dados no formato **JSON**.

---

## 📌 Objetivo

O objetivo principal é encontrar **regras do tipo A ⇒ B**, analisando a **relação de ocorrência entre itens** em uma base de dados transacional. O sistema calcula:

- **Suporte**: frequência com que um conjunto de itens aparece.
- **Confiança**: probabilidade de um item B ocorrer, dado que A já ocorreu.

---

## 🔍 Lógica e funcionamento

1. **Carregamento da base de dados** (`data.json`)
   - A base deve conter uma lista de transações, onde cada transação representa a presença ou ausência ("sim" ou "não") de diversos itens.

2. **Geração de combinações de itens**
   - O algoritmo identifica todos os **pares possíveis de itens** (itemsets de tamanho 2) que aparecem com “sim” em pelo menos uma transação.

3. **Cálculo de suporte e confiança**
   - Para cada par, o algoritmo calcula:
     - Suporte do par (ex: `leite` e `pão` juntos).
     - Confiança de `leite ⇒ pão`.
     - Confiança de `pão ⇒ leite`.

4. **Filtro por mínimos**
   - Apenas regras que atendem ao **suporte mínimo** e à **confiança mínima** são exibidas.

👨‍💻 Integrantes da equipe

- Italo Costa
- Marinaldo Nunes
