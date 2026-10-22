# Explicação - Aula 10

## 1. Por que a regra "uma pessoa só curte uma vez" deve estar no banco (índice único composto) e não só no código
* Se a validação existisse apenas no código, duas requisições simultâneas poderiam verificar que a curtida ainda não existe e inserir registros duplicados. O índice no banco garante essa restrição mesmo quando várias requisições acontecem ao mesmo tempo.

---

## 2. A diferença entre contador guardado e contador calculado, e o risco do primeiro (e como a transação o elimina)
* O contador guardado, como likesCount, fica armazenado diretamente na tabela de treinos, tornando a consulta mais rápida. Já o contador calculado usa COUNT(*) para contar as curtidas existentes no banco a cada consulta. Assim, o risco do contador guardado é ele ficar diferente do número real de curtidas se uma operação falhar. A transação resolve esse problema agrupando a criação ou remoção da curtida e a atualização do contador: ou todas as operações são confirmadas, ou todas são desfeitas.

---

## 3. O que acontece se um comando dentro de sequelize.transaction esquecer { transaction: t }
* O comando que esquecer `{ transaction: t }` será executado fora da transação. Isso significa que, se outro comando falhar e provocar um rollback, essa operação não será desfeita. Como consequência, o banco pode ficar inconsistente, por exemplo, com uma curtida registrada, mas sem a atualização correspondente do contador. Por isso, todos os comandos que fazem parte da operação precisam receber `{ transaction: t }`.  

---

## 4. O que é atualização otimista, quais são seus três passos e quando não usá-la;
* A atualização otimista é quando a interface muda imediatamente, antes da resposta da API, para tornar a experiência mais rápida. Seus três passos são: 
  1. guardar o estado anterior; 
  2. atualizar a tela imediatamente; 
  3. confirmar a alteração com a resposta da API ou desfazê-la se ocorrer um erro. 

* Deve ser usada em ações simples e frequentes, como curtir um vídeo, mas não em ações caras ou irreversíveis, como excluir um vídeo ou realizar um pagamento.

---

## 5. Por que o texto de um comentário deve sair com {{ }} e nunca com v-html
* No Vue.js, {{ }} exibe o conteúdo como texto e escapa caracteres especiais, impedindo que códigos HTML ou JavaScript enviados por usuários sejam executados. Já o v-html interpreta o conteúdo como HTML, permitindo que um comentário malicioso execute códigos no navegador de outras pessoas. Isso pode causar um ataque chamado XSS (Cross-Site Scripting). Por segurança, os comentários devem ser exibidos com {{ }}.

---

## 6. Por que .trim() precisa vir antes de .notEmpty()
* Porque o .trim() remove os espaços em branco do início e do fim do texto, enquanto o .notEmpty() verifica se o campo está vazio. Se .notEmpty() for executado primeiro, um texto contendo apenas espaços poderá passar pela validação e, depois de ser tratado pelo .trim(), tornar-se vazio. Colocando .trim() primeiro, o texto é corrigido antes da verificação, impedindo que comentários, títulos ou nomes compostos apenas por espaços sejam aceitos.