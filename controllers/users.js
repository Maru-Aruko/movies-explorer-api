const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UnauthorizedError = require('../Errors/UnauthorizedError');
const ConflictError = require('../Errors/ConflictError');
const NotFoundError = require('../Errors/NotFoundError');
const ValidError = require('../Errors/ValidError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getInfoAboutMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(' Пользователь по указанному _id не найден.');
      } return res.send({
        name: user.name,
        email: user.email,
      });
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        throw new NotFoundError(' Пользователь по указанному _id не найден.');
      }
      if (updatedUser.email === email) {
        throw new ConflictError('email не был изменен');
      }
      return res.send({
        name: updatedUser.name,
        email: updatedUser.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidError('Переданные некорректные данные при обновлении профиля'));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((newUser) => res.send({
      name: newUser.name,
      email: newUser.email,
      _id: newUser._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidError(' Переданы некорректные данные при создании пользователя.'));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с этим email уже зарегистрирован в системе'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }
          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
          return res.cookie('jwt', token, { maxAge: 3600000 * 7, httpOnly: true, sameSite: true }).send({ message: 'Вы успешно авторизованы' });
        });
    })
    .catch(next);
};
