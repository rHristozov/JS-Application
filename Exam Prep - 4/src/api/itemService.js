import { post, put, get, del } from './request.js';
import { baseItemsUrl } from '../constants.js';

async function getAll() {
  return await get(`${baseItemsUrl}?sortBy=_createdOn%20desc`);
}

async function getById(itemId) {
  return await get(`${baseItemsUrl}/${itemId}`);
}

async function create(itemData) {
  return await post(baseItemsUrl, itemData);
}

async function update(itemId, itemData) {
  return await put(`${baseItemsUrl}/${itemId}`, itemData);
}

async function deleteById(itemId) {
  await del(`${baseItemsUrl}/${itemId}`);
}
async function getByTitle(showTitle) {
  return await get(`${baseItemsUrl}?where=model%20LIKE%20%22${showTitle}%22`);
}

const solutionService = {
  getAll,
  getById,
  create,
  update,
  deleteById,
  getByTitle,
};
export default solutionService;
