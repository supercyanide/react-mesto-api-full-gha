// require('dotenv').config();
const express = require('express');
// const mongoose = require('mongoose');
// const helmet = require('helmet');
// const { errors } = require('celebrate');
// const cookieParser = require('cookie-parser');
const cors = require('cors');

// const crashTestRouter = require('./routes/crash');
// const userRouter = require('./routes/users');
// const signInRouter = require('./routes/signin');
// const signUpRouter = require('./routes/signup');
// const cardRouter = require('./routes/cards');

// const auth = require('./middlewares/auth');
// const { requestLogger, errorLogger } = require('./middlewares/logger');

// const NotFoundError = require('./errors/NotFoundError');
// const errorHandler = require('./middlewares/error-handler');

const { PORT = 3000 } = process.env;

// mongoose.connect('mongodb://localhost:27017/mestodb');
const whitelist = ['http://localhost:3001',
  'https://72e8-212-58-103-119.ngrok-free.app',
  'https://72e8-212-58-103-119.ngrok-free.app/',
  'http://72e8-212-58-103-119.ngrok-free.app',
  'http://72e8-212-58-103-119.ngrok-free.app/',
  'http://54d1-212-58-103-119.ngrok-free.app', 'https://54d1-212-58-103-119.ngrok-free.app', 'https://supercyanide.nomoredomains.rocks', 'http://supercyanide.nomoredomains.rocks', 'http://supercyanide.nomoredomains.rocks/sign-in', 'https://supercyanide.nomoredomains.rocks/sign-in'];
const app = express();

// const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
// app.use((req, res, next) => {
//   // const { origin } = req.headers;
//   const { method } = req;
//   const requestHeaders = req.headers['access-control-request-headers'];

//   res.header('Access-Control-Allow-Credentials', true);

//   res.header('Access-Control-Allow-Origin', '*');

//   if (method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//   }
//   res.end();

//   return next();
// });

// app.options('*', cors()); // include before other routes
// app.use(cors({ origin: '*' }));
app.use(
  cors({
    origin: (origin, callback) => {
      console.log(origin);
      if (!origin || whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);
// app.use(cors());
// app.use(express.json());

// app.use('/signin', (req, res, next) => {
//   console.log('CORS');
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', '*');
//   res.setHeader('Access-Control-Allow-Headers', '*');
//   res.header('Access-Control-Allow-Credentials', true);

//   // res.end();

//   next();
// });

// app.use(helmet());
// app.use(cookieParser());
// app.use((req, res, next) => {
//   console.log(req.body);
//   next();
// });

app.post('/signin', (req, res) => {
  console.log('signin');
  res.type('text/plain');
  res.status(200);
  res.send('{ "test": "GeeksforGeeks" }');
  // next();
});

app.listen(PORT, () => console.log(`🚀 ${PORT}`));


// app.get('/', (req, res) => {
//   res.type('text/plain');
//   res.status(200);
//   res.send('GeeksforGeeks');
// });

// app.options('*', cors()); // include before other routes
// app.use(cors({ origin: '*' })); // ['http://localhost:3001', 'http://localhost:3001', 'https://supercyanide.nomoredomains.rocks', 'http://supercyanide.nomoredomains.rocks'], credentials: false, maxAge: 60 }));

// app.use(requestLogger);
// app.use(crashTestRouter);
// app.use(signInRouter);
// // app.use(signUpRouter);

// app.use(auth);

// app.use(userRouter);
// app.use(cardRouter);
// app.use(errorLogger);

// app.use(errors());

// app.use(errorHandler);

// app.use('*', (req, res, next) => {
//   next(new NotFoundError('URL не найден'));
// });

// app.listen(PORT);
