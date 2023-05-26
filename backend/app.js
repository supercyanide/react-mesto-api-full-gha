require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
// const cors = require('cors');

const crashTestRouter = require('./routes/crash');
const userRouter = require('./routes/users');
const signInRouter = require('./routes/signin');
const signUpRouter = require('./routes/signup');
const cardRouter = require('./routes/cards');

const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middlewares/error-handler');
const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');
// const whitelist = [
//   'http://localhost:3001',
//   'https://localhost:3001',
//   'http://supercyanide.nomoredomains.rocks',
//   'https://supercyanide.nomoredomains.rocks',
// ];
const app = express();

app.use(cors);

// app.use(cors({
//   origin: whitelist,
//   credentials: true,
// }));

app.use(express.json());

app.use(helmet());
app.use(cookieParser());

app.use(requestLogger);
app.use(crashTestRouter);
app.use(signInRouter);
app.use(signUpRouter);

app.use(auth);

app.use(userRouter);
app.use(cardRouter);
app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.use('*', (req, res, next) => {
  next(new NotFoundError('URL не найден'));
});

app.listen(PORT, () => console.log(`🚀 Listening on ${PORT} port`));
