# Controle de participantes do Arduino Day Gim

### Como instalar? 

Certifique-se de estar usando linux, possuir uma versão do node.js maior que a versão 6.10 e possuir o mongoDB instalados em seu computador. Tendo o node e o mongo instalados clone o repositório, acesse a pasta e execute o seguinte comando:

`$ npm install --i`

### Configurações do banco

Por definição padrão os arquivos de configuração de banco estão na pasta config na raiz do projeto no arquivo "db.js". As configurações estão descritas no seguinte json: 'database': 'mongodb://localhost:27017/adg'.

### Dados padrões

Tendo em vista que você fez tudo certo, na pasta raiz execute node app. Seu servidor irá rodar na porta 3000, em seu navegador digite http://localhost:3000/setup será solicitada uma senha (001122334455) digite ela e o serviço será configurado.

### Login

Agora que você executou o setup basta fazer o login com o email: gim@ect.ufrn.br e senha: "gim@natal".
