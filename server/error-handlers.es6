
export let handleNotFound = (req, res, next) => {
  res.status(404);

  if (req.accepts('html')) {
    res.render('404', { title: 'Not found', url: req.url });
    return;
  }

  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  res.type('txt').send('Not found');
};

export let handleError = (err, req, res, next) => {
  res.status(err.status || 500);
  res.render('500', { title: 'Something went wrong' });
};
