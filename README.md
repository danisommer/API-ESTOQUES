# API-ESTOQUES
 Node.js + SQL API for materials and inventory management
 
Descrição Geral
O site permite que os usuários façam o seguinte:

Registrar-se: Criar uma nova conta de usuário.
Fazer Login: Entrar em uma conta existente.
Gerenciar Materiais: Adicionar, visualizar, atualizar e deletar materiais no estoque.
Tecnologias Utilizadas
Node.js e Express: Para criar o servidor web que lida com as requisições dos usuários.
MySQL: Um banco de dados onde as informações dos usuários e dos materiais são armazenadas.
bcrypt: Para criptografar as senhas dos usuários, garantindo a segurança.
jsonwebtoken (JWT): Para autenticação dos usuários, permitindo acesso seguro às funcionalidades do site.
CORS: Para permitir que o site seja acessado de diferentes origens (diferentes domínios).
Funcionalidades Detalhadas
Registro de Usuário (/registrar)

Entrada: Nome, e-mail e senha.
Processo: Verifica se o e-mail já está registrado, criptografa a senha e salva o novo usuário no banco de dados.
Saída: Retorna um token JWT que será usado para autenticação em futuras requisições.
Login de Usuário (/login)

Entrada: E-mail e senha.
Processo: Verifica se o e-mail está registrado e se a senha corresponde à armazenada no banco de dados.
Saída: Retorna um token JWT se a autenticação for bem-sucedida.
Visualizar Materiais (/materiais)

Autenticação: Requer um token JWT válido.
Processo: Retorna todos os materiais associados ao usuário autenticado.
Adicionar Materiais (/materiais)

Autenticação: Requer um token JWT válido.
Entrada: Nome e quantidade do material.
Processo: Adiciona o novo material ao banco de dados, vinculado ao usuário autenticado.
Saída: Retorna os detalhes do material adicionado.
Atualizar Materiais (/materiais)

Autenticação: Requer um token JWT válido.
Entrada: ID do material, novo nome e nova quantidade.
Processo: Atualiza os detalhes do material no banco de dados.
Saída: Retorna os detalhes do material atualizado.
Deletar Materiais (/materiais)

Autenticação: Requer um token JWT válido.
Entrada: ID do material.
Processo: Remove o material do banco de dados.
Saída: Confirmação de que o material foi deletado.
Segurança
Autenticação: Cada requisição que modifica ou acessa dados sensíveis (como visualizar, adicionar, atualizar ou deletar materiais) requer um token JWT válido. Esse token é emitido no momento do login ou registro e deve ser enviado pelo cliente (navegador ou aplicativo) em cada requisição subsequente.
Criptografia de Senhas: As senhas dos usuários são criptografadas usando bcrypt antes de serem armazenadas no banco de dados, o que protege contra o acesso não autorizado em caso de comprometimento do banco de dados.
Fluxo Básico de Uso
Registrar-se no sistema para obter uma conta de usuário.
Fazer login para receber um token JWT.
Utilizar o token para acessar, adicionar, atualizar ou deletar materiais no estoque.
Este sistema garante que apenas usuários autenticados possam gerenciar seus próprios materiais, mantendo a segurança e a privacidade dos dados de cada usuário.
