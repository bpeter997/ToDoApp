const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeature = require('./../utils/APIFeatures');

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findAll({
      where: APIFeature.filter(req.query),
      order: APIFeature.order(req.query),
    });

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc
      }
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByPk(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    console.log(req.body);
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    primaryKey = Model.primaryKeyAttributes[0];
    const result = await Model.update(req.body, { where: { [primaryKey]: req.params.id } });
    if (!result[0]) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
    });
  });

  exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    primaryKey = Model.primaryKeyAttributes[0];
    const doc = await Model.destroy({where: { [primaryKey]: req.params.id }});

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  });


