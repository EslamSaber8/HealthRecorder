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
