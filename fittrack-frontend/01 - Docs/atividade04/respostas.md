# Explicação - Aula 04

## 1. O que é um JWT (as três partes, o que é assinado vs. o que é só codificado) e por que o payload nunca deve conter dados sensíveis
* Um JWT tem 3 partes separadas por pontos: Header (algoritmo), Payload (dados como `id` e `role`) e Signature (assinatura). Header e Payload são apenas codificados em Base64 (qualquer pessoa consegue ler o conteúdo), enquanto a Assinatura garante que o token não foi alterado. Dados sensíveis (como senhas ou números de cartão) nunca devem ir no payload porque ele não é criptografado.

---

## 2. Por que "logout", num sistema JWT stateless, não revoga nada no servidor — e o que mudaria isso
* Como o servidor não guarda estado de sessões ativas (é stateless), ele apenas confere se a assinatura do token enviado é válida. O logout se resume a apagar o token do cliente (`localStorage`). Para revogar o token no servidor, seria necessário criar uma lista negra de tokens invalidados (blocklist) no banco de dados ou em cache (como Redis) até o token expirar.

---

## 3. Por que ler o token do localStorage diretamente dentro do interceptor do Axios evita um problema de dependência circular entre arquivos
* Se o interceptor do Axios importasse a store do Pinia para pegar o token, e a store importasse a instância do Axios para fazer requisições, ocorreria um loop de importação circular (um arquivo depende do outro para ser inicializado). Ler diretamente via `localStorage.getItem('token')` quebra essa dependência e garante o envio do cabeçalho sem travar a aplicação.