const Movies = require('../models/movie');
const NotFoundError = require('../Errors/NotFoundError');
const ValidError = require('../Errors/ValidError');
const ForbiddenError = require('../Errors/ForbiddenError');

const {
  MOVIE_INVALID_DATA, MOVIE_NOT_FOUND, MOVIE_INVALID_ID, MOVIE_FORBIDDEN_DELETE,
  MOVIE_SUCCESS_DELETE,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movies.find({ owner })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  Movies.create({ owner, ...req.body })
    .then((newMovie) => res.send(newMovie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidError(MOVIE_INVALID_DATA));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  const movieId = req.params.id;
  Movies.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MOVIE_NOT_FOUND);
      } else if (String(movie.owner) !== owner) {
        throw new ForbiddenError(MOVIE_FORBIDDEN_DELETE);
      }
      movie.remove()
        .then(() => res.send({ message: MOVIE_SUCCESS_DELETE }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidError(MOVIE_INVALID_ID));
      } else {
        next(err);
      }
    });
};
