import { post, put, get, del } from './request.js';
import { baseItemsUrl } from '../constants.js';

async function getAll() {
  return await get(`${baseItemsUrl}?sortBy=_createdOn%20desc`);
}

async function getById(itemId) {
  return await get(`${baseItemsUrl}/${itemId}`);
}

async function create(itemData) {
  const { 'image-url': imageUrl, ...otherData } = itemData;
  return await post(baseItemsUrl, { imageUrl, ...otherData });
}

async function update(itemId, itemData) {
  const { 'image-url': imageUrl, ...otherData } = itemData;
  return await put(`${baseItemsUrl}/${itemId}`, {
    imageUrl,
    ...otherData,
  });
}

async function deleteById(itemId) {
  await del(`${baseItemsUrl}/${itemId}`);
}

const solutionService = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
export default solutionService;
