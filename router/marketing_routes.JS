const router = require('express').Router();
    
const birthdayController = require('../controllers/user-control/birthday-controller');
const emailController = require('../controllers/user-control/email-controller');
const authenticate = require('../middleware/authenticate');

router.post('/api/detect-birthday', authenticate, birthdayController().detectBirthday )
router.get('/api/birthday/isTokenValid', authenticate, birthdayController().checkBirthdayValidity )
router.post('/api/birthday/save-address', authenticate, birthdayController().saveDeliveryAddress )

router.post('/api/marketing/create-contact', emailController().createContact)

module.exports = router;