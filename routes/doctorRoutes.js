const express = require('express');
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
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
