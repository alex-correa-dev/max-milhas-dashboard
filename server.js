const express = require('express');
const bodyParser = require('body-parser');
const compress = require('compression');
const cors = require('cors');
const http = require('http');
const logger = require('winston');

const app = express();
const port = process.env.PORT || 7070;
const env = process.env.NODE_ENV || 'development';

app.use(compress());
app.use(bodyParser());
app.use(cors());

const staticFolder = env === 'production' ? './.dist' : './.tmp';

app.set('views', staticFolder);
app.use(express.static(staticFolder));

const server = http.createServer(app);

server.listen(port, () => {
  logger.info(`Express server listening on port ${port}`);
  logger.log(`env = ${app.get('env')}\n__dirname = ${__dirname}\nprocess.cwd = ${process.cwd()}`);
});
