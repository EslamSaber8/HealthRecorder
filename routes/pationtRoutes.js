const express = require('express');
const pationtController = require('../controllers/pationtController');
const pationtAuthController=require("../controllers/pationtAuthController");
const router = express.Router();
router.post("/signup",pationtAuthController.signup)
router.post("/login",pationtAuthController.login)
router
  .route('/')
  .get(pationtController.getAllPationts)
  .post(pationtController.createPationt);

router
  .route('/:id')
  .get(pationtController.getPationt)
  .patch(pationtController.updatePationt)
  .delete(pationtController.deletePationt);

module.exports = router;
