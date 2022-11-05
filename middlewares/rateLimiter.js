const rateLimit = require('express-rate-limit');

module.exports.rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
