require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/users');
const signInRouter = require('./routes/signin');
const signUpRouter = require('./routes/signup');
const cardRouter = require('./routes/cards');

const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middlewares/error-handler');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');
const app = express();
app.use(express.json());
app.use(helmet());
app.use(cookieParser());

app.use(requestLogger);

app.use(signInRouter);
app.use(signUpRouter);

app.use(auth);

app.use(userRouter);
app.use(cardRouter);
app.use(errorLogger);

app.use('*', (req, res, next) => {
  next(new NotFoundError('URL не найден'));
});
app.use(errors());

app.use(errorHandler);
app.listen(PORT);
