const express = require('express');

const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/', studentController.index);
router.get('/students/new', studentController.newForm);
router.post('/students', studentController.create);
router.get('/students/:id/edit', studentController.editForm);
router.post('/students/:id', studentController.update);
router.post('/students/:id/delete', studentController.delete);

module.exports = router;
