const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const r = require('../utils/regex');
const {
  getUsers,
  getUser,
  getMe,
  updateProfile,
  updateProfileAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getMe);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), getUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(r),
  }),
}), updateProfileAvatar);

module.exports = router;
