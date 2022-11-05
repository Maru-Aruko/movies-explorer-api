const router = require('express').Router();
const { validateLogin, validateSignup } = require('../middlewares/validation');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const routerUsers = require('./users');
const routerMovies = require('./movies');
const NotFoundError = require('../Errors/NotFoundError');

router.post('/signup', validateSignup, createUser);
router.post('/signin', validateLogin, login);

router.get('/signout', auth, (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

router.use('/users', auth, routerUsers);
router.use('/movies', auth, routerMovies);

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Страницы не существует'));
});

module.exports = router;
