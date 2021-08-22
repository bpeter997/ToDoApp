const { Op } = require('sequelize');

function getOperatotByMatch(match) {
  switch (match) {
    case 'gte':
      return Op.gte;
    case 'gt':
      return Op.gt;
    case 'lte':
      return Op.lte;
    case 'lt':
      return Op.lt;
    case 'iLike':
      return Op.iLike;
    default:
      return match;
  }
}

function convertFilterQueryObjectToOperation(queryObj) {
  const newObject = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const key in queryObj) {
    if (Object.hasOwnProperty.call(queryObj, key)) {
      const element = queryObj[key];
      if (typeof element === 'object') {
        const nestedObjectKey = Object.keys(queryObj[key])[0];
        const newObjectKey = getOperatotByMatch(nestedObjectKey);
        newObject[key] = {
          [newObjectKey]: queryObj[key][nestedObjectKey]
        };
      } else {
        newObject[key] = queryObj[key];
      }
    }
  }
  return newObject;
}

exports.filter = query => {
  const queryObj = { ...query };
  const excludedFields = ['page', 'order', 'limit', 'fields'];
  excludedFields.forEach(el => delete queryObj[el]);
  return convertFilterQueryObjectToOperation(queryObj);
};

exports.order = query => {
  const queryObj = { ...query };
  if (!queryObj.order) return;
  return [queryObj.order.split('[')[0]];
};
