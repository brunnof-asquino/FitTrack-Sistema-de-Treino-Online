# Explicação - Aula 09

## 1. A diferença entre 401 , 403 e 404 , e por que a verificação de "existe?" vem antes da de "é seu?".
* O código 401 (Unauthorized) indica que o usuário não está autenticado (precisa fazer login). O 403 (Forbidden) significa que o usuário está autenticado, mas não tem permissão para acessar aquele recurso. Já o 404 (Not Found) aponta que o recurso solicitado simplesmente não existe no sistema. Já a checagem de existência ("existe?") deve vir antes da verificação de propriedade ("é seu?"). Se checarmos se o recurso pertence ao usuário antes de validar se ele existe, um usuário mal-intencionado conseguiria descobrir quais IDs existem no banco apenas analisando se a resposta foi um erro de permissão (403) em vez de um erro de inexistência (404). Validar a existência primeiro garante que respostas uniformes (como 404) sejam dadas para recursos que não devem ser expostos, evitando ataques.

---

## 2. Por que, ao excluir ou trocar um arquivo, o banco é atualizado antes do disco, e o que poderia dar errado na ordem inversa.
* Atualizar o banco de dados antes de remover o arquivo físico garante a integridade lógica da aplicação. Se apagarmos o arquivo primeiro e a transação do banco falhar, o sistema apontará para um caminho inexistente, gerando links quebrados. Mas e se o banco for atualizado primeiro e a remoção física falhar em seguida, o pior cenário será apenas um arquivo sobrando no disco. Isso evita corromper a experiência do usuário e permite limpezas posteriores.

---

## 3. O que é um arquivo órfão, dê dois exemplos reais do seu projeto e diga onde a limpeza acontece.
* Um arquivo órfão é qualquer arquivo armazenado no servidor que não possui mais nenhuma referência vinculada a ele no banco de dados. Dois exemplos no meu projeto, são a imagem de avatar antiga de um usuário quando é substituída por uma nova, ou a mídia de um post que foi excluído, mas cuja remoção física falhou. Já a limpeza costuma ocorrer no backend.

---

## 4. Por que o botão de excluir não pode ficar dentro de um `<a>` , e por que o modal não pode ficar dentro do card.
* Aninhar um botão interativo dentro de um elemento `<a>` gera conflitos de eventos (bubbling), pois links são semanticamente feitos para navegação, o que pode quebrar o comportamento esperado. E se o modal estiver aninhado dentro do HTML de um card, ele ficará preso às regras de estilo do componente (como overflow: hidden ou posicionamentos relativos). O ideal é posicionar o modal na raiz do DOM.

---

## 5. Por que esconder o botão "Editar" de quem não é dono não é segurança.
* Esconder o botão apenas impede que ele apareça na interface, mas não bloqueia o acesso direto à rota. Um usuário ainda pode tentar enviar uma requisição manualmente. Por isso, a API deve verificar se ele é o dono do vídeo e retornar 403 caso não tenha permissão.