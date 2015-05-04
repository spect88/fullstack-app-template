import { Router } from 'express';

let routes = Router();

routes.get('/', (req, res) => {
  res.render('index', { title: 'Full-stack App Template' });
});

export default routes;
