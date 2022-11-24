const { MONGOOSE_DB } = process.env;
const MONGO_DB = MONGOOSE_DB || 'mongodb://localhost:27017/moviesdb';

const USER_NOT_FOUND = 'Пользователь по указанному _id не найден.';
const USER_INVALID_DATA = 'Переданы некорректные данные при обновлении профиля.';
const USER_CONFLICT_EMAIL = 'Пользователь с этим email уже зарегистрирован в системе.';
const USER_INVALID_SIGNUP = 'Переданы некорректные данные при создании пользователя.';

const MOVIE_INVALID_DATA = 'Переданы некорректные данные при создании фильма.';
const MOVIE_NOT_FOUND = 'Фильм с указанным _id не найден.';
const MOVIE_INVALID_ID = 'Введен некорректный _id фильма.';
const MOVIE_FORBIDDEN_DELETE = 'Доступ ограничен';

const MOVIE_SUCCESS_DELETE = 'Фильм удалён.';

const NEED_AUTHORIZE = 'Необходима авторизация.';
const INVALID_EMAIL_OR_PASS = 'Неправильные почта или пароль';
const SUCCESSFUL_LOGIN = 'Вы успешно авторизованы';
const SUCCESSFUL_EXIT = 'Выход';

const SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка.';

const PAGE_NOT_FOUND = 'Страницы не существует.';

const MONGO_DUPLICATE_ERR = 11000;

module.exports = {
  MONGO_DB,
  USER_NOT_FOUND,
  USER_INVALID_DATA,
  USER_CONFLICT_EMAIL,
  USER_INVALID_SIGNUP,
  MOVIE_INVALID_DATA,
  MOVIE_NOT_FOUND,
  MOVIE_INVALID_ID,
  MOVIE_FORBIDDEN_DELETE,
  MOVIE_SUCCESS_DELETE,
  NEED_AUTHORIZE,
  INVALID_EMAIL_OR_PASS,
  SUCCESSFUL_LOGIN,
  SUCCESSFUL_EXIT,
  SERVER_ERROR_MESSAGE,
  PAGE_NOT_FOUND,
  MONGO_DUPLICATE_ERR,
};
