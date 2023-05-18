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
const pationtController = require('../controllers/pationtController');
const router = express.Router();
router
  .route('/:id')
  .patch(pationtController.updateByDoctor)

module.exports = router;
