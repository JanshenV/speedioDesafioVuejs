# speedioDesavioVuejs

## Para rodar o back-end:

- Primeiro passo: Ter o repositório clonado na máquina.
- Segundo passo: abra o command prompt, windows terminal, git bash ou terminal do vscode na pasta root "back-end" do repositório clonado.
- Terceiro passo: Utilizar o comando "npm install" para que todas as dependências do projeto sejam instaladas.
- Quarto passo: Criar banco de dados a partir dos schemas que estão em src/database/schemas e criar suas respectivas tabelas.
- Quinto passo: criar um arquivo ".env" e utilizar preencher os dados como no ".env.EXAMPLE" No .example estão contidos as informações da port, info do banco de dados, secret jwt para lidar com tokens e o bilty token que é o token do serviço qual utilizei para encurtar urls(https://bitly.com/).
  -Sexto passo: utilizar o comando "npm run dev" para iniciar o projeto.

Para rodar o front-end:
Primeiro passo: Ter o repositório clonado na máquina.
Segundo passo: abra o command prompt, windows terminal, git bash ou terminal do vscode na pasta root "back-end" do repositório clonado.
Terceiro passo: utilizar o comando "npm install" para que as dependências do projeto sejam instaldas.
Quarto passo: instaladas as dependÊncias, roode o comando "npm run serve". Ao finalizar o serve essa mensagem irá aparecer: App running at:

- Local: http://localhost:8080/
- Network: http://192.168.1.8:8080/
  Segure ctrl e click no primeiro http://localhost:8080/. Isso abrirar o projeto no browser.
