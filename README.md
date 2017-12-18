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

Destacamos que usamos o _Angular Material_ que é a adaptação do _Material Design_ para _AngularJS_ por ser um material bastante usado por usuários.

Usamos o _EcmaScript 6_ pela facilidade de escrever _Javascript_ com ele pelas evoluções apresentadas.

Os testes funcionais e unitários foram feitos usando _Jasmine_ por ser um framework bem usado pela comunidade.

Utilizamos o _SASS_ como pré-processador _CSS_ e o [RSCSS](http://rscss.io) como padrão arquitetural de desenvolvimento.
