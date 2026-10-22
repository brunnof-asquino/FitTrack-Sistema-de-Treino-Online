# Explicação dos Três Ramos (Axios Interceptors) - Aula 02

Este documento detalha o funcionamento dos três ramos condicionais utilizados no tratamento de erros de interceptação de respostas do Axios.

## 1. `error.response`
* A requisição foi enviada e o servidor respondeu, mas com um código de status de erro (ex: 4xx ou 5xx).

---

## 2. `error.request`
* A requisição foi feita, mas nenhuma resposta foi recebida do servidor.

---

## 3. `else`
* Ocorre antes mesmo de enviar a requisição de fato, cobrindo erros de configuração ou falhas ao tentar montar a chamada (ex: parâmetros inválidos de setup).