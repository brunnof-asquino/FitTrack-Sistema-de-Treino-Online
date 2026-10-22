# Respostas - Aula 06 / Checkpoint 01

---

## 1. Alguma rota ( *Routes.js ) contém lógica de negócio, em vez de só declarar verbo + caminho + middlewares + controller ?
* Não. As rotas não devem possuir lógicas de negócio (como acesso a banco de dados ou interpretação direta de `req.body`/`req.query`). Elas servem para declarar o verbo, o caminho, os middlewares e o controller.

## 2. Algum Controller consulta o Model diretamente, sem passar pelo Service?
* Não. O Controller não faz consultas diretas ao Model. Ele apenas delega essas operações ao Service correspondente.

## 3. Algum Service faz referência a req / res ?
* Não. A camada de Service não trabalha com as requisições HTTP por trás, portanto, não deve referenciar `req` ou `res`.

## 4. Todo Controller usa success() / error() de apiResponse.js ?
* Sim. Não existe nenhum retorno de resposta usando res.json(...) escrito manualmente.

## 5. Toda rota que chama uma função async está envolvida em asyncHandler ?
* Sim. Toda rota assíncrona é obrigatoriamente encapsulada pelo asyncHandler.

## 6. Toda validação de entrada usa express-validator, sem nenhum if manual escondido?
* Sim. A validação é concentrada no `express-validator`, não devendo existir validações manuais via if escondidas dentro de um Controller ou Service.

## 7. config/constants.js não tem nenhuma constante solta sem uso, nem nenhum valor de validação fora dela?
* Não. O `arquivo config/constants.js` não possui constantes soltas ou valores de validação desnecessários.

## 8. A constante de limite da bio (Aula 05) é usada exatamente uma vez, no lugar certo?
* Sim. A constante BIO_MAX é utilizada exatamente uma vez no projeto.