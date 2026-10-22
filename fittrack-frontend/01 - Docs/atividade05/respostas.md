# Explicação - Aula 05

## 1. O que é multipart/form-data , e por que um arquivo não cabe, na prática, dentro de um corpo JSON
* Arquivos são dados binários. O JSON aceita apenas texto, enquanto o `multipart` divide a requisição em blocos para enviar arquivos reais sem perda de desempenho ou necessidade de codificação (como Base64).

---

## 2. Por que a instância do Axios ( api.js ) não muda nesta aula, mesmo upload de arquivo exigindo um Content-Type diferente do padrão configurado nela
* Não precisa alterar o `api.js` porque, ao passar um objeto `FormData`, o próprio navegador remove o `json` padrão e injeta o `multipart/form-data` com o identificador (boundary) correto automaticamente.

---

## 3. Por que validar um campo contra uma constante "de nome parecido, mas pensada para outra coisa" é um erro sutil — e como perceber isso antes de acontecer.
* Usar a constante errada (ex: limite em bytes de imagem para validar tamanho de texto) gera um erro sutil. Funciona por coincidência, mas quebra a regra de negócio quando as configurações mudam.