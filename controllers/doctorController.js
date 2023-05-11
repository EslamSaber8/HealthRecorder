const Doctor = require('../models/doctorModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllDoctor = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Doctor.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const doctors = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: doctors.length,
    data: {
      doctors
    }
  });
});

exports.getDoctor = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id);
  

  if (!doctor) {
    return next(new AppError('No doctor found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      doctor
    }
  });
});

exports.createDoctor = catchAsync(async (req, res, next) => {
  const newDoctor = await Doctor.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      doctor: newDoctor
    }
  });
});

exports.updateDoctor = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!doctor) {
    return next(new AppError('No doctor found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      doctor
    }
  });
});


exports.pId = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    return next(new AppError('No Doctor found with that ID', 404));
  }

  // Push new elements from the request body to the corresponding array fields
  if (req.body.pId) {
    doctor.pId.push(...req.body.pId);
  }

  // Save the updated document
  await doctor.save();

  res.status(200).json({
    status: 'success',
    data: {
      doctor
    }
  });
});





exports.deleteDoctor = catchAsync(async (req, res, next) => {
  const doctor= await Doctor.findByIdAndDelete(req.params.id);

  if (!doctor) {
    return next(new AppError('No doctor found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});


