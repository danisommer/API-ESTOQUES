# API-ESTOQUES
 Node.js + SQL API for materials and inventory management
 
Descrição geral:

O site permite aos usuários registrar-se, fazer login e gerenciar materiais no estoque. Utiliza Node.js e Express para o servidor web, MySQL para o banco de dados, bcrypt para criptografar senhas, e jsonwebtoken para autenticação. As senhas são criptografadas, e a autenticação é necessária para acessar ou modificar dados sensíveis. O Postman foi amplamente utilizado para testar e documentar a API. Os usuários podem adicionar, visualizar, atualizar e deletar materiais. O frontend do projeto foi construído em React.js e foi utilizado Axios para lidar com requisições HTTP.

Registrar-se: Criar uma nova conta de usuário.
Fazer Login: Entrar em uma conta existente.
Gerenciar Materiais: Adicionar, visualizar, atualizar e deletar materiais no estoque.
Tecnologias Utilizadas
Node.js e Express: Para criar o servidor web que lida com as requisições dos usuários.
MySQL: Um banco de dados onde as informações dos usuários e dos materiais são armazenadas.
bcrypt: Para criptografar as senhas dos usuários, garantindo a segurança.
jsonwebtoken (JWT): Para autenticação dos usuários, permitindo acesso seguro às funcionalidades do site.
CORS: Para permitir que o site seja acessado de diferentes origens (diferentes domínios).
