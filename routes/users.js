const router = require('express').Router();
const { validateId, validateUpdateProfile } = require('../middlewares/validation');
const { getInfoAboutMe, updateProfile } = require('../controllers/users');

router.get('/me', validateId, getInfoAboutMe);

router.patch('/me', validateUpdateProfile, updateProfile);

module.exports = router;
