const { Op } = require("sequelize");

exports.filter = (query) => {
  let queryObj = { ...query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach(el => delete queryObj[el]);
  console.log(queryObj);
  return convertFilterQueryObjectToOperation(queryObj);
}

function convertFilterQueryObjectToOperation(queryObj) {
  const newObject = {};
  for (const key in queryObj) {
    if (Object.hasOwnProperty.call(queryObj, key)) {
      const element = queryObj[key];
      if (typeof element === 'object') {
        const nestedObjectKey = Object.keys(queryObj[key])[0];
        const newObjectKey = getOperatotByMatch(nestedObjectKey); 
        newObject[key] = {
          [Op.lte]: queryObj[key][nestedObjectKey]
        }
      } else {
        newObject[key] = queryObj[key];
      }
    }
  }
  return newObject;
}

function getOperatotByMatch(match) {
  switch(match) {
    case 'gte': return [Op.gte];
    case 'gt': return [Op.gt];
    case 'lte': return [Op.lte];
    case 'lt': return [Op.lt];
  }
  return match;
}