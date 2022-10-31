const Movies = require('../models/movie');
const NotFoundError = require('../Errors/NotFoundError');
const ValidError = require('../Errors/ValidError');
const ForbiddenError = require('../Errors/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movies.find({ owner })
    .then((movies) => {
      if (!movies) {
        throw new NotFoundError(' Сохраненные фильмы не найдены.');
      } res.send(movies);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  Movies.create({ owner, ...req.body })
    .then((newMovie) => res.send({
      country: newMovie.country,
      director: newMovie.director,
      duration: newMovie.duration,
      year: newMovie.year,
      description: newMovie.description,
      nameRU: newMovie.nameRU,
      nameEN: newMovie.nameEN,
      image: newMovie.image,
      trailer: newMovie.trailer,
      thumbnail: newMovie.thumbnail,
      movieId: newMovie.movieId,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidError('Переданы некорректные данные при создании фильма.'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  Movies.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(' Фильм с указанным _id не найден.');
      } else if (String(movie.owner) !== owner) {
        throw new ForbiddenError('Доступ ограничен');
      }
      movie.remove()
        .then(() => res.send({ message: 'Фильм удален' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidError(' Введен некорректный _id фильма.'));
      } else {
        next(err);
      }
    });
};
