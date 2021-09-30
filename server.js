const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(`${__dirname}/dist/angular-tour-of-heroes`));
app.get('/*', (reg, res) => {
  res.sendFile(path.join(`${__dirname}/dist/angular-tour-of-heroes/index.html`));
});
app.listen(process.env.PORT || 300);