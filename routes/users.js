const router = require('express').Router();
const { validateUpdateProfile } = require('../middlewares/validation');
const { getInfoAboutMe, updateProfile } = require('../controllers/users');

router.get('/me', getInfoAboutMe);

router.patch('/me', validateUpdateProfile, updateProfile);

module.exports = router;
