import express from 'express';
import morgan from 'morgan';
import exphbs from 'express-handlebars';
import compression from 'compression';

import paths from '../config/paths.json';
import routes from './routes';

import { handleNotFound, handleError } from './error-handlers';

let logger = morgan('dev');

let hbs = exphbs.create({
  extname: '.hbs',
  layoutsDir: paths.server.views.layouts.dir,
  partialsDir: paths.server.views.partials.dir,
  defaultLayout: 'main'
});

let app = express();

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', paths.server.views.dir);

app.use(logger);

app.use(compression());
app.use(express.static(paths.dist.dir));

app.use(routes);

app.use(handleNotFound);
app.use(handleError);

export default app;
