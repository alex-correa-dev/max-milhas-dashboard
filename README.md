# Max Milhas Dashboard

O objetivo desse projeto é criar um dashboard da Max Milhas que filtra vôos e mostra o resultado em uma lista com informações necessárias.

## Instalação

Para instalar a aplicação, basta descompactar o arquivo zipado recebido ou clonar do _Github_:

```
git clone https://github.com/AlexRobertoCorrea/max-milhas-dashboard.git
```

Entrar na pasta max-milhas-dashboard criada:

```
cd max-milhas-dashboard
```

É necessário ter as versões atuais do _NodeJS_ e _Bower_ instalados e fazer em seguida:

```
npm install && bower install
```

e todos os pacotes necessários serão instalados.

## Decisões técnicas

Para tanto, usamos o _AngularJS_ como framework frontend por melhor familiaridade, porém, usando a abordagem por componentes, que é semelhante ao que 
os frameworks atuais usam.

Usamos no _NodeJS_ versão 8.9.3, que é a mais atual estável como middleware e _ExpressJS_ como framework backend, pela simplicidade e melhor desempenho dessa versão.
 
O _Gulp_ foi usado como task runner, pela facilidade de uso dele. A principal task dele é a de testes, para executá-la, fazemos:

```
npm test
```

que executa o linter e os testes automatizados. Como linter usamos o _Eslint_ com auxílio do _Prettier_ e usamos a versão 6 do _EcmaScript_.

Para executar a aplicação no modo desenvolvimento, fazemos:

```
npm run dev
```

Para executar a aplicação no modo produção, fazemos:

```
npm run build

npm start
```

ou via _Docker_:

```
docker build -t max-milhas-dashboard/max-milhas-dashboard .

docker run -p 7070:7070 -d max-milhas-dashboard/max-milhas-dashboard
```

Independente do modo escolhido, no browser executamos:

```
localhost:7070
```

## Decisões de implementação

A intenção inicial é fazer a página de dashboard com todas as funcionalidades possíveis, feitas em mobile first seguida por desktop. Entretanto,
a quantidade de funcionalidades para implementar foi muito grande e algumas decisões foram tomadas com o objetivo a entregar o melhor possível
dentro do tempo estabelecido. Para tanto, fizemos:

- A arquitetura formada por componentes;
- Testes unitários e funcionais;
- A maior parte da tela feita com _Angular Material_ que é a adaptação do _Material Design_ para _AngularJS_;
- Utilização do _EcmaScript 6_.

Mas é necessário reconhecer que faltaram alguns itens:

- Estilização usando _SASS_ e usar [RSCSS](http://rscss.io) como padrão arquitetural de desenvolvimento;
- Interação do usuário na interface com reflexo nas apis;
- Definição da tela usando mobile first, seguido por desktop;
- Melhoria da cobertura de testes unitários e funcionais;
- Refatoração de algumas funções que estão extensas;