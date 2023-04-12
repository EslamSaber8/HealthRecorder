const express = require('express');
const doctorController = require('../controllers/doctorController');

const router = express.Router();

router
  .route('/')
  .get(doctorController.getAllDoctor)
  .post(doctorController.createDoctor);

router
  .route('/:id')
  .get(doctorController.getDoctor)
  .patch(doctorController.updateDoctor)
  .delete(doctorController.deleteDoctor);

module.exports = router;
