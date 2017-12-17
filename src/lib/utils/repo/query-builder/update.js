function push(obj) {
  if (!obj) throw new Error('The input argument cannot be undefined');
  if (Array.isArray(obj)) throw new Error('The input argument cannot be of array type');
  const keys = Object.keys(obj);
  const result = {};
  keys.forEach((key) => {
    if (Array.isArray(obj[key])) {
      result[key] = { $each: obj[key] };
    } else {
      result[key] = obj[key];
    }
  });
  return { $push: result };
}

function set(obj) {
  if (!obj) throw new Error('The input argument cannot be undefined');
  if (Array.isArray(obj)) throw new Error('The input argument cannot be of array type');
  return { $set: obj };
}

function setPush(setObj, pushObj) {
  const pushResult = push(pushObj);
  const setResult = set(setObj);
  Object.assign(pushResult, setResult);
  return pushResult;
}

module.exports = {
  push,
  set,
  setPush,
};
