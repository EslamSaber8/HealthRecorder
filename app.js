const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const pationtRouter = require('./routes/pationtRoutes');
const doctorRouter = require('./routes/doctorRoutes');
const updateRouter=require("./routes/updateRoutes ");
const pId=require("./routes/pIdRoutes");

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/pationts', pationtRouter);
app.use('/api/v1/doctors', doctorRouter);
app.use("/api/v1/update",updateRouter);
app.use("/api/v1/pId",pId);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
