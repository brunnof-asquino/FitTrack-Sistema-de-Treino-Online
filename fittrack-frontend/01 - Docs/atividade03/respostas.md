# Explicação - Aula 03

## 1. O que é um ORM, e o que sync({ alter: true }) faz de fato no seu banco
* Um ORM (como o Sequelize) traduz tabelas do banco de dados para objetos no código. O método `sync({ alter: true })` compara os seus modelos com as tabelas atuais e altera a estrutura do banco (adicionando colunas novas, alterando tipos) para bater com o código sem apagar os dados existentes.

---

## 2. Por que a senha nunca é salva em texto puro, e como bcrypt.hash / bcrypt.compare resolvem isso sem nunca "desfazer" o hash
* Senhas nunca são salvas em texto puro para evitar vazamentos em invasões. O `bcrypt.hash` gera uma "impressão digital" (hash) irreversível usando um salt aleatório. O `bcrypt.compare` resolve isso pegando a senha digitada, aplicando o mesmo processo de hash e verificando se os resultados finais são idênticos, sem precisar descobrir qual era a senha original.

---

## 3. Por que uma função async que lança erro precisa de asyncHandler , enquanto uma função síncrona não precisa
* Em funções síncronas, erros jogados com `throw` são capturados automaticamente pelo tratamento padrão do Express. Em funções assíncronas (`async`), se uma Promise é rejeitada, o erro fica "preso" na Promise e pode travar o servidor. O `asyncHandler` envolve a função em um `try/catch` e repassa o erro para o middleware de tratamento global usando `next(error)`.

---

## 4. Por que existe validação nos dois lados (client e server), e qual delas realmente decide se o dado é aceito.
* A validação no Client serve apenas para melhorar a experiência do usuário (feedback rápido na tela). A validação no Server é a que realmente decide se o dado é aceito, pois ela protege a aplicação contra requisições maliciosas enviadas por fora da interface (como via Postman ou cURL).