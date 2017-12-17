function secondReadQuery(includes, excludes) {
  const result = {};
  if (includes && includes.length) {
    includes.forEach((element) => {
      result[element] = 1;
    }, this);
  }
  if (excludes && excludes.length) {
    excludes.forEach((element) => {
      result[element] = 0;
    }, this);
  }
  return result;
}

function thirdReadQuery(limit, skip) {
  return { limit, skip };
}

module.exports = {
  secondReadQuery,
  thirdReadQuery,
};
