# FitTrack Aula 01 - Setup do Ambiente e Primeiro Marco de Integração

## PARTE A - Backend: API Node.js / Express

### Etapa 1 - Setup do Ambiente e Criação do Projeto
- [x] `node -v` e `npm -v` conferidos
- [x] Pasta `fittrack-api` criada, separada da pasta do front
- [x] `package.json` gerado com `npm init -y`

### Etapa 2 - Instalando as Dependências e Configurandos os Scripts
- [x] `express`, `cors`, `dotenv`, `morgan` instalados como dependências
- [x] `nodemon` instalado como devDependency
- [x] Scripts `start` e `dev` configurados no `package.json`

### Etapa 3 - Estrutura de Pastas
- [x] Pastas `bin/`, `config/`, `middlewares/`, `modules/`, `routes/` criadas
- [x] `.gitignore` criado com `node_modules/` e `.env`

### Etapa 4 - O Padrão Único de Resposta da API
- [x] `middlewares/apiResponse.js` criado com as funções `success` e `error`

### Etapa 5 - A Primeira Rota: GET /api
- [x] `routes/index.js` criado, com `name` / `message` adaptados para o FitTrack
- [x] Campo `data.status` escrito exatamente em minúsculo (`status: 'online'`)

### Etapa 6 - CORS: Autorizando o Front-end
- [x] `.env` criado com `PORT=3000` e `CORS_ORIGIN=http://localhost:5173`

### Etapa 7 - Montando app.js e Subindo o Servidor
- [x] `app.js` criado, montando `indexRouter` sob o prefixo `/api`
- [x] `bin/www` criado
- [x] `npm run dev` sobe o servidor sem erros, exibindo a mensagem de confirmação

### Etapa 8 - Testando a API Isoladamente
- [x] `curl http://localhost:3000/api` responde o JSON esperado contendo `{"status": "online"}`

---

## PARTE B - Frontend: Vue 3 + Vite

### Etapa 1 - Verificação e Criação do Projeto
- [x] `curl` confirmou que a API FitTrack está respondendo
- [x] `npm run dev` abriu a página padrão em `http://localhost:5173`

### Etapa 2 - Organização de Pastas e Variáveis de Ambiente
- [x] Estrutura de pastas criada (`views`, `components`, `router`, `services`, `stores`)
- [x] `HelloWorld.vue` removido e `style.css` limpo
- [x] `.env` criado com `VITE_API_URL=http://localhost:3000/api`
- [x] `.gitignore` configurado

### Etapa 3 - Vue Router: Mapeando TODAS as Telas
- [x] Tabela de tradução "funcionalidade -> tela" preenchida para o FitTrack
- [x] Uma tela placeholder criada para cada rota/linha da tabela
- [x] `src/router/index.js` criado com todas as rotas do sistema
- [x] Router registrado no `main.js`
- [x] Navegação manual via URL testada e funcionando para cada rota

### Etapa 4 - Layout Base: Navbar, Sidebar e Footer
- [x] `TheNavbar.vue`, `TheSidebar.vue` e `TheFooter.vue` criados com links `<router-link>`
- [x] Layout montado em `App.vue` com o `<router-view />` configurado
- [x] Troca dinâmica de páginas funcionando mantendo o layout fixo

### Etapa 5 - Consumindo a API: Marco Visual da Landing Page
- [x] Landing Page exibindo "Status da API: online" com dados consumidos da API
- [x] Erro de CORS reproduzido intencionalmente alterando a porta no `.env` da API e devidamente corrigido/documentado


---


# FitTrack Aula 02 - Trilhas API (Módulo de Busca) + Frontend (Camada de Comunicação com a API)

## PARTE A - Backend: O Primeiro Módulo de Domínio

### Etapa 1 - Criando o módulo search
- [x] Pasta `modules/search/` criada
- [x] `searchService.js` criado, com o nome da sua entidade no plural

### Etapa 2 - Criando o controller
- [x] `searchController.js` criado, usando `exports.search = ...`
- [x] O objeto retornado usa o nome da sua entidade no plural, igual ao definido no service

### Etapa 3 - Criando a rota
- [x] `searchRoutes.js` criado, com `router.get('/search', searchController.search)`

### Etapa 4 - Registrando o módulo em app.js
- [x] `searchRoutes` importado no topo de `app.js`
- [x] `app.use('/api', searchRoutes)` adicionado
- [x] API reiniciou sem erros

### Etapa 5 - Testando isoladamente
- [x] `curl http://localhost:3000/api/search?q=teste` responde no formato esperado, com o nome certo do campo
- [x] `curl http://localhost:3000/api/search` (sem `q`) responde com `query: ""`
- [x] `curl http://localhost:3000/api` continua respondendo normalmente

---

## PARTE B - Frontend: A Camada de Comunicação com a API

### Etapa 1 - Instância única do Axios
- [x] `src/services/api.js` criado com `axios.create(...)` utilizando o `VITE_API_URL`

### Etapa 2 - Interceptor de resposta (tratamento de erro centralizado)
- [x] Interceptor de resposta adicionado a `api.js`
- [x] Comentário explicativo escrito no topo do arquivo descrevendo os três ramos

### Etapa 3 - Criando os primeiros services
- [x] `authService.js` criado com `register`, `login`, `logout` (ainda sem uso)
- [x] `searchService.js` criado, utilizando `params: { q: query }`
- [x] `systemService.js` criado

### Etapa 4 - Refatorando a Landing Page
- [x] `LandingView.vue` usando `getApiStatus()` do `systemService` em vez do `fetch`
- [x] Página ainda mostra "Status da API: online"

### Etapa 5 - Validando a camada com a busca
- [x] Console mostrou `Busca OK:` com o objeto esperado, usando o nome certo da sua entidade
- [x] Erro de rede provocado de propósito caiu na mensagem amigável do interceptor, e não num erro técnico
- [x] Bloco de teste removido da  `Landing Page` ao final


---


# FitTrack Aula 03 - Persistência de Dados e Primeiro Cadastro Real (Trilhas API + Frontend)

## PARTE A - Backend: Persistência de dados e primeiro cadastro real

### Etapa 1 - Criando o módulo search
- [x] `sequelize` , `mysql2` , `bcryptjs` , `express-validator` instalados

### Etapa 2 - Preparando o Banco de Dados MySQL
- [x] Banco de dados criado no MySQL, com o nome anotado na sua ficha
- [x] `.env` atualizado com DB_HOST , DB_PORT , DB_NAME , DB_USER , DB_PASSWORD
- [x] `config/database.js` criado

### Etapa 3 - config/constants.js
- [x] `config/constants.js` criado

### Etapa 4 - O Módulo user
- [x] `userModel.js` criado, com o campo de contagem renomeado corretamente
- [x] `userValidator.js` criado
- [x] `userService.js` criado, com `getPublicProfile` também usando o campo de contagem renomeado
- [x] Nunca a senha (nem o hash) é devolvida em nenhuma resposta
- [x] `middlewares/asyncHandler.js` criado
- [x] `middlewares/errorHandler.js` criado
- [x] `userController.js` e `userRoutes.js` criados, ambos idênticos ao modelo 

### Etapa 5 -  Registrando o Módulo e o errorHandler em app.js
- [x] `userRoutes` e `errorHandler` importados e registrados em `app.js`, na ordem certa
- [x] Terminal exibe Banco de dados sincronizado! ao subir a API
- [x] No MySQL, a tabela users do seu banco existe, com todas as colunas do Model

### Etapa 6 -  Testando
- [x] Cadastro com sucesso responde 201 com { id, username, email }
- [x] Senha curta responde 400 com a mensagem correta
- [x] Cadastro duplicado responde 500 (não é bug, é esperado)
- [x] GET `/profile/:username` confirma os dados persistidos

---

## PARTE B - Frontend: a Tela de Registro

### Etapa 1 - Conferindo a Navbar

### Etapa 2 - Conferindo a Navbar
- [x] Existe um link clicável para `/register` em algum lugar acessível a um visitante deslogado

### Etapa 3 - Construindo o Formulário Controlado
- [x] Formulário controlado com v-model amarrando cada campo a `form`
- [x] `errors` e `apiErrorMessage` já preparados no `<script setup>` , mesmo antes de escrever `validate() / handleSubmit()`

### Etapa 4 - Validação Client-Side
- [x] `validate()` replica exatamente os mesmos limites configurados no userValidator.js do seu back-end
- [x] Mensagens de erro aparecem/desaparecem corretamente conforme o usuário corrige os campos

### Etapa 5 - Integrando com a API
- [x] Envio vazio não dispara nenhuma chamada de rede
- [x] Cadastro válido navega para `/login`
- [x] Cadastro duplicado exibe `apiErrorMessage` com a mensagem vinda de verdade da API

### Etapa 6 - Teste Prático e Confirmação Fora do Navegador
- [x] Os cinco comportamentos acima foram testados e conferem
- [x] curl confirma que o cadastro feito pela tela está persistido no banco


---


# FitTrack Aula 04 - Login com JWT, Pinia e Proteção de Rotas (Trilhas API + Frontend)

## PARTE A - Backend: Login, JWT e Middleware de Autenticação

### Etapa 1 - Funções
- [x] `jsonwebtoken` instalado
- [x] `.env` atualizado com `JWT_SECRET` e `JWT_EXPIRES_IN`
- [x] `config/jwt.js` criado e programado com as funções de carregamento e segurança do `.env` , geração e verificação de tokens
- [x] `middlewares/auth.js` criado e programado
- [x] `userService.js` atualizado com `loginUser` e `getUserProfile`
- [x] `userValidator.js` atualizado com `loginValidator`
- [x] `userController.js` atualizado com `login` , `logout` , `getMyProfile`
- [x] `userRoutes.js` atualizado, com /profile/me antes de /profile/:username

### Etapa 2 - Testes
- [x] Login com sucesso devolve token e user (incluindo isAdmin )
- [x] Senha errada devolve 500 com mensagem genérica
- [x] GET /profile/me sem token devolve 401
- [x] GET /profile/me com token válido devolve os dados do usuário
- [x] GET /profile/me com token inválido devolve 401

---

## PARTE B - Frontend: Login, Pinia e Proteção de Rotas

### Etapa 1 - Funções
- [x] `createPinia()` registrado em `main.js` , antes de .use(router)
- [x] `stores/auth.js` criado, com persistência via localStorage
- [x] Interceptor de requisição anexando Authorization quando existe token
- [x] Interceptor de resposta limpando a sessão e redirecionando em qualquer 401
- [x] Os nomes de chave usados aqui batem exatamente com os usados na store (Etapa 2)
- [x] Bootstrap 5 (CSS) incluído via CDN
- [x] `assets/main.cs`s criado, com a cor de marca do seu projeto
- [x] Telas construídas de hoje em diante usam classes Bootstrap; as telas das Aulas 01–03 permanecem como estão, por ora
- [x] Tela de Login funcional, chamando `authStore.login(...)`
- [x] Destino padrão pós-login ajustado ao nome real da sua rota principal
- [x] Guarda de rota bloqueando acesso direto a rotas com `requiresAuth: true`
- [x] `useAuthStore()` chamado dentro do callback, não no topo do arquivo
- [x] Navbar mostra links diferentes conforme o estado de login
- [x] Logout limpa a sessão e redireciona

### Etapa 2 - Testes
- [x] Login funcional → redireciona à tela principal do seu projeto.
- [x] F5 na página logado → sessão persiste (confira localStorage no DevTools).
- [x] Logout → depois disso, digitar a URL de uma rota protegida na barra de endereço deve redirecionar ao Login, com `?redirect=...` na URL.
- [x] Login a partir dessa tela redirecionada → deve voltar exatamente para a rota original.
- [x] Com a sessão ativa, edite manualmente o token no localStorage (DevTools) para um valor
qualquer, recarregue numa rota protegida → deve ser automaticamente redirecionado ao
Login (prova do interceptor de 401 ).


---


# FitTrack Aula 05 - Upload de Arquivos e Edição de Perfil (Trilhas API + Frontend)

## PARTE A - Backend: Upload de Arquivos com Multer

### Etapa 1 - Tarefas
- [x] Pasta `public/uploads/profiles/` criada, com um `default-profile.png` dentro
- [x] multer instalado
- [x] BIO_MAX: xxx adicionado a `config/constants.js`
- [x] `middlewares/profileMulter.js` criado
- [x] require('path') e a linha de `express.static` adicionados, antes das rotas da API
- [x] `profileUpdateValidator` , `updateUserProfile` , `updateProfile` e a rota PUT `/profile/me` criados, na ordem correta

### Etapa 2 - Testes
- [x] Atualização sem foto funciona, mantendo a foto atual
- [x] Atualização com foto nova funciona, e a foto antiga (se não era a padrão) é removida do disco
- [x] GET `/uploads/profiles/<qualquer-arquivo>` responde 200
- [x] Bio acima de xxx caracteres é recusada com 400

---

## PARTE B - Frontend: Formulário Multipart e a Tela de Meu Perfil

### Etapa 1 - Tarefas
- [x] Link para a tela de perfil visível na Navbar, só quando logado
- [x] `.env` atualizado, `utils/media.js` criado
- [x] `updateProfile(formData)` adicionada — a única chamada de toda a aplicação a sobrescrever o `Content-Type` padrão


### Etapa 2 - Testes
- [x] Tela carrega os dados reais do usuário ao montar
- [x] Selecionar uma foto atualiza a prévia instantaneamente, sem chamada de rede
- [x] Salvar funciona, com e sem trocar de foto


---


# FitTrack Aula 06 / Checkpoint 1: Componentização, useAuth() e Acerto de Contas Visual (Trilhas API + Frontend)

## PARTE A - Backend: Checkpoint de Consistência (Sem Código Novo)

### Etapa 1 - Questões
- [x] Alguma rota ( `*Routes.js` ) contém lógica de negócio, em vez de só declarar verbo + caminho + middlewares + controller ?
- [x] Algum Controller consulta o Model diretamente, sem passar pelo `Service`?
- [x] Algum Service faz referência a req / res ?
- [x] Todo Controller usa success() / error() de `apiResponse.js` ?
- [x] Toda rota que chama uma função async está envolvida em `asyncHandler` ?
- [x] Toda validação de entrada usa `express-validator` , sem nenhum if manual escondido?
- [x] `config/constants.js` não tem nenhuma constante solta sem uso, nem nenhum valor de validação fora dela?
- [x] A constante de limite da bio (Aula 05) é usada exatamente uma vez, no lugar certo?

### Etapa 2 - Tarefas
- [x] `checkpoint-01.md` criado e respondido
- [x] Todos os endpoints já construídos continuam respondendo como esperado

---

## PARTE B - Frontend: Componentização e Consistência Visual

### Etapa 1 - Tarefas
- [x] `bootstrap-icons` incluído via CDN
- [x] Os três componentes-base (`BaseInput`, `BaseButton` e `FormCard`) criados em `src/components/base/`
- [x] As três telas refatoradas para usar `BaseInput` / `BaseButton` / `FormCard`
- [x] Tela de Registro agora visualmente consistente com Login/Perfil (usando a cor de marca do seu projeto, sem nenhuma cor nova introduzida) `composables/useAuth.js` criado
- [x] Guarda de rota atualizado para usar `useAuth()`
- [x] Navbar atualizada para usar `useAuth()`
- [x] Nenhum link novo aponta para uma funcionalidade que seu projeto ainda não construiu

### Etapa 2 - Testes
- [x] Cadastro → confirme o redirecionamento ao Login, com a tela agora estilizada.
- [x] Login → confirme o redirecionamento à sua tela principal.
- [x] Navbar → confirme a troca correta entre estado logado/deslogado.
- [x] Edição de Perfil → confirme que os três comportamentos da Atividade 05 (dados reais, edição, upload de foto) continuam funcionando, agora passando pelos componentes-base.
- [x] Guarda de rota → deslogado, tente acessar a URL de uma tela protegida diretamente → confirme o redirecionamento ao Login.
- [x] Console do DevTools sem nenhum erro novo durante todo o teste.


---


# FitTrack Aula 07: Upload da Entidade Principal com Indicador de Progresso (Trilhas API + Frontend)

## PARTE A - Backend: Model, Associação e Upload

### Etapa 1 - Tarefas
- [x] Pasta(s) de upload da sua entidade criada(s)
- [x] TITLE_MAX adicionado a VALIDATION
- [x] Model criado, com o(s) campo(s) de arquivo certo(s) para o seu grupo (A ou B)
- [x] `config/associations.js` criado
- [x] Middleware de upload da sua entidade criado, coerente com seu Grupo
- [x] `validator` , `service` , `controller` e `routes` da sua entidade criados
- [x] Ordem de middlewares na rota conferida (auth → multer → validator → controller)
- [x] Rota montada em `app.js`
- [x] `config/associations` carregado antes do sync
- [x] Tabela nova confirmada no banco, com FK

### Etapa 2 - Testes
- [x] Upload completo funciona e a coluna de contagem do usuário sobe
- [x] Cada um dos quatro casos de erro é recusado com o status esperado

---

## PARTE B - Frontend: Formulário, Progresso e Alcançabilidade

### Etapa 1 - Tarefas
- [x] Service criado, recebendo onUploadProgress como parâmetro
- [x] `.progress-bar` (e, se aplicável, `.thumbnail-preview` ) adicionadas ao seu CSS
- [x] Formulário completo, adaptado ao seu domínio e ao seu Grupo (A ou B)
- [x] Barra de progresso funcionando
- [x] Prévia de imagem funcionando (onde aplicável)
- [x] Link/botão adicionado, visível só para usuários autenticados
- [x] Resposta ao checklist de alcançabilidade escrita, junto com a entrega

### Etapa 2 - Testes
- [x] Faça login → clique no link novo do Bloco 16 → confirme a URL mudando sem recarregar a página.
- [x] Tente enviar vazio → confirme os erros de campo obrigatório.
- [x] Se Grupo A: escolha só um dos dois arquivos → confirme o erro pedindo o outro.
- [x] Escolha o(s) arquivo(s) corretamente → confirme a prévia de imagem (onde aplicável), sem nenhuma chamada de rede.
- [x] Envie → observe a barra de progresso avançar → confirme a mensagem de sucesso.
- [x] Nas DevTools → Network, confirme Content-Type: `multipart/form-data; boundary=...` na requisição.
- [x] Confirme, no banco ou via Postman, que o registro foi criado e a coluna de contagem do usuário subiu.


---


# FitTrack Aula 08: Streaming, Detalhe da Entidade Principal e Feed Paginado (Trilhas API + Frontend)

## PARTE A - Backend: Detalhe, Feed e Streaming

### Etapa 1 - Tarefas
- [x] `middlewares/optionalAuth.js` criado
- [x] `getWorkoutDetails` / `getFeedWorkout` adicionados ao service
- [x] Controller e rota do detalhe criados, com `optionalAuth`
- [x] Coluna de visualizações confirmada (criada ou reaproveitada)
- [x] Rota de streaming criada, protegida por `isAuthenticated` 
- [x] `Content-Type` ajustado ao seu tipo real de arquivo 
- [x] `getFeed` adicionado a `userController.js` / `userRoutes.js`

### Etapa 2 - Testes
- [x] Detalhe sem token → `200` , `isOwner: false` , contagem de visualizações em 1.
- [x] Detalhe com o token do dono → `200` , `isOwner: true` , contagem em 2 .
- [x] Detalhe de um item inexistente → `404`.
- [x] requisição com Range: `bytes=0-1023` → `206` , com Content-Range correto
- [x] Feed sem token → `401`.
- [x] Feed com token, `?page=1&limit=1` → um item só.
- [x] Feed com token, `?page=2&limit=1` → [] (se você só tem um item), ou o próximo item.

---

## PARTE B - Frontend: Feed e Detalhe com Dados Reais

### Etapa 1 - Tarefas
- [x] Função(ões) de URL adicionadas a `utils/media.js`, coerentes com seu Grupo
- [x] Classes de card adicionadas, com a proporção certa para o seu tipo de conteúdo
- [x] Classe de player adicionada
- [x] Funções `getWorkoutById` e `getFeed` criadas no `userService.js`
- [x] Componente de card criado, adaptado ao seu domínio
- [x] Tela de Feed exibindo itens reais, com paginação "Carregar mais" funcionando
- [x] Tela de Detalhe exibindo o item real, com o player/imagem correto para o seu projeto
- [x] `isOwner`, recebido da API, guardado no estado da tela, mesmo sem uso visual ainda 

### Etapa 2 - Testes
- [x] Faça login → clique no link do seu Feed na `Navbar/Sidebar` → confirme itens reais aparecendo.
- [x] Clique num card → confirme a navegação para o detalhe, sem recarregar a página.
- [x] Confirme que o player reproduz, e que dá para arrastar a barra de progresso livremente (`seek`). Nas DevTools → Network, confirme que o arquivo carrega do caminho estático, não da rota / stream , e que ao menos uma requisição tem status `206` .
- [x] Recarregue a tela de detalhe (F5) uma segunda vez → confirme, via curl em `GET` /api/workouts/:id, que a contagem de visualizações subiu.
- [x] Acesse um id inexistente diretamente pela URL → confirme a mensagem de erro, sem a tela
quebrar.


---


# FitTrack Aula 09: CRUD do Item, Perfil Público e Limpeza de Arquivos Órfãos (Trilhas API + Frontend)

## PARTE A - Backend

### Etapa 1 - Tarefas
- [x] `reload()` adicionado ao seu detalhe
- [x] Duas chamadas seguidas ao detalhe devolvem contagens consecutivas
- [x] Verificação `404` antes de `403`, nas duas funções que verificam dono
- [x] Ordem banco → disco respeitada
- [x] Contador do usuário decrementado na exclusão
- [x] Quatro handlers no controller ( `getMy<SuasEntidades>`, `get<SuaEntidade>ForEdit`, `update<SuaEntidade>` e `delete<SuaEntidade>` )
- [x] Quatro rotas, com Multer antes do validador no `PUT`
- [x] `include` + `order` no nível de cima em `getPublicProfile`
- [x] `isOwner` devolvido no perfil público
- [x] `/profile/:username` com `optionalAuth`, depois de `/profile/me`
- [x] `errorHandler.js` atualizado para limpeza de arquivos órfãos e ainda sendo o último `app.use` do `app.js`

### Etapa 2 - Testes
- [x] `GET` `/my-<entidades>` sem token → `401` ; com A → lista, mais novo primeiro; com B (sem itens) → [].
- [x] GET `/<rota>/:id/edit` : sem token → `401` ; com B → `403` ; id inexistente → 404 ; com A → `200` (e a contagem de visualizações não muda).
- [x] `PUT` só com texto, com A → `200` , arquivo inalterado, nenhuma mudança na contagem de arquivos.
- [x] `PUT` com arquivo novo, com A → `200` , nome do arquivo mudou, a contagem de arquivos da pasta continua igual (entrou um, saiu outro).
- [x] Órfãos: `PUT` com arquivo novo feito por B → `403` ; `PUT` com arquivo novo e título vazio feito por A → `400` . Nos dois casos, a contagem de arquivos não pode subir.
- [x] `DELETE` com B → `403` ; com A → `200` ; `GET` do item → `404` ; arquivos sumiram das pastas; contador do usuário caiu em 1; repetir o `DELETE` → `404` .
- [x] `GET` `/profile/:username` anônimo ( `isOwner: false` , lista de itens ordenada), com o token do dono ( `isOwner: true` ), com o token de B ( `false` ), e de um usuário inexistente ( `404` ).

---

## PARTE B - Frontend

### Etapa 1 - Tarefas
- [x] `useClickOutside.js` criado
- [x] `BaseModal.vue` criado
- [x] Funções `getMy<SuasEntidades>()` , `get<SuaEntidade>ForEdit(id)` , `update<SuaEntidade>(id, formData)` e `delete<SuaEntidade>(id)` criadas
- [x] `getPublicProfile` criada
- [x] Card sem `<a>` gigante, com autor clicável/opcional e slot `actions`
- [x] O Feed da Atividade 08 continua funcionando sem alteração
- [x] Menu abre pelo clique, alinha à direita, fecha ao clicar fora/em um item/com Esc
- [x] Perfil Público com os três botões corretos (dono / logado / visitante)
- [x] Meus Itens com modal fora do card, `busy` e remoção local da lista
- [x] Editar Item com e sem arquivo novo
- [x] Autor clicável e botão "Editar" condicional no Detalhe
- [x] Link para Meus Itens na mensagem de sucesso do Upload

### Etapa 2 - Testes
- [x] Menu do avatar: abre, fecha fora, fecha com Esc, fecha ao escolher um item.
- [x] "Ver Perfil" → seu perfil, com Editar Perfil (não "Seguir") e seus itens. Clique no autor de um card de outra conta → perfil dela, com "Seguir" (que ainda não faz nada). Dentro dele, clique no autor de outro card: a tela troca sem recarregar.
- [x] Janela anônima em `/profile/<username>` → sem "Seguir" e sem "Editar Perfil". Username inexistente → mensagem de erro, tela intacta.
- [x] Meus Itens: com uma conta sem itens → estado vazio com link; com itens → grade com Editar/Excluir. Clique em Excluir → o modal abre sem navegar para o detalhe, centralizado mesmo com o mouse sobre o card; Cancelar/X/clicar fora/Esc fecham; clicar dentro da caixa branca não fecha.
- [x] Confirme uma exclusão → o item some sem recarregar; os arquivos sumiram da pasta de uploads da API; o contador do perfil caiu.
- [x] Edição: formulário pré-preenchido; salve só o texto → arquivo mantido; troque o arquivo → prévia imediata, e o antigo some da pasta; apague o título → mensagem do cliente, sem requisição nova na aba Network.
- [x] DevTools → Network: o PUT com arquivo tem Content-Type: `multipart/form-data`; `boundary=...` .
- [x] Logado como B, digite na URL a edição de um item da A → mensagem de permissão, sem a tela quebrar. Id inexistente → mensagem de não encontrado.
- [x] Deslogado, abra a URL de Meus Itens → vai ao login e volta para ela depois de entrar.
- [x] Detalhe de um item seu → "Editar" visível; de outra pessoa → ausente.
- [x] Regressão: Feed, Detalhe com player/imagem, Upload, Meu Perfil, Login/Logout.


---


# FitTrack Aula 10: Curtidas e Comentários na Entidade Principal (Trilhas API + Frontend)

## PARTE A - Backend

### Etapa 1 - Tarefas
- [x] `COMMENT_MAX` e as duas colunas de contador adicionadas
- [x] `Models` `Like` e `Comment` criados, com o índice único composto no `Like`
- [x] Associações nos dois sentidos
- [x] Tabelas e colunas conferidas no banco
- [x] Módulo `like` completo (3 rotas) e registrado no `app.js`
- [x] Módulo `comment` completo (2 rotas, validador com trim primeiro) e registrado
- [x] Todas as escritas duplas (linha + contador) dentro de transação
- [x] Detalhe devolvendo `isLiked` (e os contadores)
- [x] Exclusão em transação, com limpeza de curtidas e comentários
- [x] Contadores no perfil público
- [x] `trim()` movido para o início nos campos obrigatórios

### Etapa 2 - Testes
- [x] Curtir sem token → `401` ; entidade inexistente → `404` .
- [x] B curte → `201` , `liked: true` , contador 1 ; B curte de novo → `200` , `liked: false` , 0 ; de novo → `201` , 1 ; A curte → 2 .
- [x] `like-status` (com e sem token) e `isLiked` no detalhe: visitante `false` ; B `true` .
- [x] No banco, tente inserir uma curtida repetida à mão → o banco recusa (índice único).
- [x] `liked-workouts` com B → os itens, cada um com o autor; sem token → `401` .
- [x] Comentar: sem token `401` ; só espaços `400` ; 501 caracteres `400` ; entidade inexistente `404` ;sucesso `201` com o texto aparado e o autor.
- [x] Listar comentários sem token → `200` , mais novos primeiro; contador no detalhe igual ao número de itens.
- [x] Excluir uma entidade que tem curtidas e comentários → `200` ; no banco, nenhuma linha restante em `likes` / `comments` para ela; arquivos removidos; contador do usuário decrementado.
- [x] Título/nome só com espaços → `400` depois da correção.
- [x] Regressão: upload, detalhe, feed, edição e perfil como antes.

---

## PARTE B - Frontend

### Etapa 1 - Tarefas
- [x] Dois services (do `like` e do `comment`) criados
- [x] Formatador ( `utils/format.js` ) criado
- [x] CSS criado
- [x] `LikeButton` com atualização otimista, rollback e `isBusy`
- [x] Visitante é levado ao login e volta
- [x] Lista com carregando/erro/vazio; formulário validado
- [x] Comentário novo no topo, sem recarregar a lista
- [x] Texto escapado e quebras de linha preservadas
- [x] Detalhe com curtir + comentários
- [x] Contadores no card
- [x] Tela de itens curtidos com rota e acessível por um clique

### Etapa 2 - Testes
- [x] Visitante (janela anônima): vê o botão e a lista, sem formulário; clicar em curtir leva ao login e volta ao detalhe depois de entrar.
- [x] Logado: curtir muda o coração na hora; F5 mantém; descurtir desfaz.
- [x] DevTools → Network → Slow 4G: o coração ainda muda imediatamente. Depois, Offline: o coração muda, volta atrás e a mensagem de erro aparece.
- [x] Comentar: vazio, só espaços e mais de 500 caracteres geram erro sem chamar a API; um comentário válido de duas linhas aparece no topo, com as linhas preservadas, e o contador sobe.
- [x] Comente exatamente `<b>teste</b>` `<img src=x onerror="alert(1)">` → aparece como texto, sem negrito e sem alerta.
- [x] Os contadores aparecem no card do Feed, do Perfil e de Meus Itens, atualizados.
- [x] Pelo menu/Sidebar, abra a tela de itens curtidos: descurtir um item no detalhe o tira da lista.
- [x] Como A, exclua um item que tem curtidas e comentários → funciona, e o item some da lista de curtidos de B.
- [x] Regressão: Feed, Perfil, Meus Itens (editar/excluir), Upload, Login/Logout.