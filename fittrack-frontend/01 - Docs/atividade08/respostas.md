# Explicação - Aula 08

## 1. A diferença entre um middleware que bloqueia sem token ( isAuthenticated ) e um que tenta identificar, mas nunca bloqueia ( optionalAuth ) — e por que o detalhe do seu item precisa do segundo.
* O `isAuthenticated` bloqueia a requisição caso o token não exista, enquanto o `ioptionalAuth` apenas  identifica o usuário se houver token sem barrar a visita. E o detalhe do item precisa do segundo para ser acessível publicamente e, ao mesmo tempo, entregar dados personalizados (como status de curtida) para quem estiver logado.

---

## 2. Por que uma tag `<video>` / `<audio>` / `<img>` não consegue enviar um cabeçalho Authorization , e como isso decide para onde o src deve apontar.
* As tags HTML nativas disparam requisições `GET` diretas do navegador sem permitir a inserção de cabeçalhos HTTP customizados, obrigando o `src` a apontar para rotas públicas ou endpoints que autentiquem via cookies de sessão ou tokens na própria URL (query parameters).

---

## 3. O que é uma requisição Range , e por que ela importa para um arquivo de mídia grande.
* É uma requisição HTTP que solicita apenas um trecho específico de bytes do arquivo (cabeçalho Range), permitindo que mídias grandes iniciem a reprodução instantaneamente e aceitem avanços na linha do tempo (`seek`) sem carregar o arquivo inteiro de uma vez.

---

## 4. Como a fórmula offset = (page - 1) * limit converte "página" (o que o cliente pede) em "quantos registros pular" (o que o banco entende).
* A fórmula calcula o número de páginas inteiras que já ficaram para trás (page - 1) e multiplica pelo tamanho de cada página (`limit`), gerando o total exato de linhas acumuladas que o banco de dados deve pular (`OFFSET`) antes de retornar o primeiro registro da página atual.