import { post, put, get, del } from './request.js';
import { baseTattooUrl as baseTattooUrl } from '../constants.js';

async function getAll() {
  return await get(`${baseTattooUrl}?sortBy=_createdOn%20desc`);
}

async function getById(tattooId) {
  return await get(`${baseTattooUrl}/${tattooId}`);
}

async function create(droneData) {
  const {
    'name-input': name,
    'image-url-input': imageUrl,
    'year-input': year,
    'more-info-textarea': learnMore,
    ...otherData
  } = droneData;
  return await post(baseTattooUrl, {
    name,
    imageUrl,
    year,
    learnMore,
    ...otherData,
  });
}

async function update(tattooId, droneData) {
  const {
    'name-input': name,
    'image-url-input': imageUrl,
    'year-input': year,
    'more-info-textarea': learnMore,
    ...otherData
  } = droneData;
  return await put(`${baseTattooUrl}/${tattooId}`, {
    name,
    imageUrl,
    year,
    learnMore,
    ...otherData,
  });
}

async function deleteById(tattooId) {
  await del(`${baseTattooUrl}/${tattooId}`);
}

const tattooService = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
export default tattooService;
