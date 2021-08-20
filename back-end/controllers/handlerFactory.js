const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeature = require('./../utils/APIFeatures');
const { Op } = require("sequelize");

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findAll({
      where: APIFeature.filter(req.query),
    });

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc
      }
    });
  });


