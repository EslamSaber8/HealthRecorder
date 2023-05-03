const express = require('express');
const doctorController = require('../controllers/doctorController');
const doctorAuthController=require("../controllers/doctorAuthController");
const router = express.Router();
router.post("/signup",doctorAuthController.signup)
router.post("/login",doctorAuthController.login)
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
