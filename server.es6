#!/usr/bin/env babel-node

import app from './server/app';

let port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on ${port}...`);
});
