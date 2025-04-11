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
    'image-url': imageUrl,
    'user-type': userType,
    ...otherData
  } = droneData;
  return await post(baseTattooUrl, { imageUrl, userType, ...otherData });
}

async function update(tattooId, droneData) {
  const {
    'image-url': imageUrl,
    'user-type': userType,
    ...otherData
  } = droneData;
  return await put(`${baseTattooUrl}/${tattooId}`, {
    imageUrl,
    userType,
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
