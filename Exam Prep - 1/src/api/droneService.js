import { post, put, get, del } from './request.js';
import { baseDronesUrl } from '../constants.js';

async function getAll() {
  return await get(`${baseDronesUrl}?sortBy=_createdOn%20desc`);
}

async function getById(droneId) {
  return await get(`${baseDronesUrl}/${droneId}`);
}

async function create(droneData) {
  return await post(baseDronesUrl, droneData);
}

async function update(droneId, droneData) {
  return await put(`${baseDronesUrl}/${droneId}`, droneData);
}

async function deleteById(droneId) {
  await del(`${baseDronesUrl}/${droneId}`);
}

const droneService = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
export default droneService;
