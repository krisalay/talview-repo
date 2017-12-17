import mongoCodes from './mongo-codes.json';
import { set, push, setPush } from './query-builder/update';

async function create(Model, payload) {
  const item = new Model(payload);
  let saveResult;
  try {
    saveResult = await item.save();
  } catch (e) {
    return { success: false, message: e.code ? mongoCodes[e.code] : e.message };
  }
  return { success: true, message: 'Added successfully.', data: saveResult };
}

async function read(model, firstQuery, secondQuery, thirdQuery) {
  let queryResult;
  try {
    queryResult = await model.find(firstQuery, secondQuery, thirdQuery).lean();
  } catch (e) {
    return { success: false, message: e, data: null };
  }
  return { success: true, message: 'Data found', data: queryResult.length ? queryResult : null };
}

async function remove(model, firstQuery) {
  let queryResult;
  try {
    queryResult = await model.remove(firstQuery);
  } catch (e) {
    return { success: false, message: e, data: null };
  }
  return { success: true, message: 'Data removed', data: queryResult };
}

async function update(model, firstQuery, type, setObj, pushObj) {
  let query;
  let queryResult;
  console.log(pushObj);
  if (type === 'set') query = set(setObj);
  else if (type === 'push') query = push(pushObj);
  else if (type === 'setpush') query = setPush(setObj, pushObj);
  else throw new Error(`No "${type}" update type found`);
  console.log(query);
  try {
    queryResult = await model.update(firstQuery, query);
  } catch (e) {
    return { success: false, message: e, data: null };
  }
  return { success: true, message: 'Updation successfull', data: queryResult };
}

module.exports = {
  create,
  read,
  remove,
  update,
};
