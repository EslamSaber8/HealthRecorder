const Pationt = require('../models/pationtModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllPationts = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Pationt.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const pationts = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: pationts.length,
    data: {
      pationts
    }
  });
});

exports.getPationt = catchAsync(async (req, res, next) => {
  const pationt = await Pationt.findById(req.params.id);
  

  if (!pationt) {
    return next(new AppError('No pationt found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      pationt
    }
  });
});

exports.createPationt = catchAsync(async (req, res, next) => {
  const newPationt = await Pationt.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      pationt: newPationt
    }
  });
});

exports.updatePationt = catchAsync(async (req, res, next) => {
  const pationt = await Pationt.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!pationt) {
    return next(new AppError('No pationt found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      pationt
    }
  });
});

exports.deletePationt = catchAsync(async (req, res, next) => {
  const pationt = await Pationt.findByIdAndDelete(req.params.id);

  if (!pationt) {
    return next(new AppError('No pationt found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});


