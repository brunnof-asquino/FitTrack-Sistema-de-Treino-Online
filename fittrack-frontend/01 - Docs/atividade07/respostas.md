# Explicação - Aula 07

## 1. Por que uma associação ( hasMany / belongsTo ) precisa ser declarada explicitamente para o Sequelize, e por que centralizá-las num arquivo só evita um problema de referência circular entre models.
* O Sequelize precisa das declarações explícitas para entender as chaves estrangeiras no banco de dados e criar automaticamente os métodos de consulta relacional (como include ou métodos auxiliares). Centralizar todas as associações em um único arquivo (como `models/index.js`) evita a referência circular, que ocorre quando o arquivo do modelo User importa diretamente o Workout e o Workout tenta importar o User ao mesmo tempo, fazendo com que um dos dois seja importado como um objeto vazio/indefinido durante a inicialização do `Node.js`.

---

## 2. A diferença entre multer.single(...) (um arquivo) e multer.fields([...]) (vários arquivos, cada um com seu próprio nome de campo) — e por que seu projeto usa um ou outro.
* O `multer.single('campo')` aceita apenas um único arquivo enviado sob um único nome de campo no formulário. O `multer.fields([...])` aceita múltiplos arquivos simultâneos, permitindo definir um nome de campo diferente para cada arquivo recebido. O projeto utiliza o `multer.fields` porque a rota de upload precisa receber dois arquivos distintos na mesma requisição multipart: o arquivo de vídeo (workout) e a imagem de capa (thumbnail).

---

## 3. O que onUploadProgress do Axios recebe, e como transformar isso numa porcentagem exibível.
* O `onUploadProgress` recebe um objeto de evento (progressEvent) com as propriedades `loaded` (quantidade de bytes já enviados) e `total` (tamanho total dos arquivos em bytes). Para converter em uma porcentagem de 0 a 100, divide-se o valor enviado pelo total e multiplica-se por 100.