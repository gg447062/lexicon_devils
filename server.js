const express = require('express');
const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
    } else {
      next();
    }
  });
}

app.use('/', express.static(__dirname + '/public'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
