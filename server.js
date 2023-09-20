const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions');

const PORT = process.env.PORT || 3000;

// Middleware
// Custom middleware
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Built-in middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Supply public files to routes
app.use('/', express.static(path.join(__dirname, '/public')));

//! Routes
app.use('/', require('./routes/root'));
app.use('/employees', require('./routes/api/employees'));

// // '^/$|/index.html' starts and ends with / OR equals /index.html
// // (.html)? makes .html optional
// app.get('^/$|/index(.html)?', (req, res) => {
//   // res.sendFile('./views/index.html', { root: __dirname});
//   res.sendFile(path.join(__dirname, 'views', 'index.html'));
// });

// app.get('/new-page(.html)?', (req, res) => {
//   res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
// });

// app.get('/old-page(.html)?', (req, res) => {
//   res.status(301).redirect('/new-page'); // 302 by default
// });

//! Route handlers
// app.get(
//   '/hello',
//   (req, res, next) => {
//     console.log('Attempting to serve Hello World!');
//     next();
//   },
//   (req, res) => {
//     res.send('Hello World!');
//   }
// );

//! Chaining route handlers
// const one = (req, res, next) => {
//   console.log('one');
//   next();
// };
// const two = (req, res, next) => {
//   console.log('two');
//   next();
// };
// const three = (req, res) => {
//   console.log('three');
//   res.send('Chain finished');
// };

// app.get('/chain(.html)?', [one, two, three]);

// Default
app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
