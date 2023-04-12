const express = require('express');
const pationtController = require('../controllers/pationtController');
const router = express.Router();
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
