# Explicação - Aula 06

## 1. A diferença entre um componente ( BaseInput ) e um composable ( useAuth ).
* Componente (`BaseInput`): É a camada de apresentação. É responsável por renderizar a interface do usuário (UI), lidando com elementos visuais (HTML, CSS) e eventos de tela.

* Composable (`useAuth`): É a camada de lógica. Encapsula regras de negócio, estado reativo e funções (como autenticação ou chamadas de API) de forma reutilizável, sem gerar nenhuma interface visual.

---

## 2. O que defineModel() resolve, e por que ele evita repetir a dança manual de props / emit em cada componente que precisa de v-model.
* O `defineModel()` resolve a verbosidade do two-way data binding. Por baixo dos panos, ele declara automaticamente a `prop` (ex: `modelValue`) e o evento correspondente (ex: `update:modelValue`). Ao invés de ter que ler a `prop` e disparar um `emit` manualmente toda vez que o usuário digitar algo, ele retorna uma `ref` reativa que pode ser modificada diretamente, sincronizando o valor com o componente pai de forma automática e com muito menos código.

---

## 3. Por que uma tela nova (link na Navbar/Sidebar) só deve ser adicionada quando a funcionalidade que ela representa já existir, ou tiver uma aula futura clara para isso.
* Para evitar rotas que dão erro 404 ou levam a telas vazias. Na prática de desenvolvimento, isso protege a experiência do usuário (UX), evita que a navegação do sistema quebre e mantém o projeto limpo, garantindo que não seja acumulado links e códigos inúteis para funcionalidades que talvez nunca saiam do papel.