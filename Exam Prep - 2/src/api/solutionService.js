import { post, put, get, del } from './request.js';
import { baseSolutionUrl } from '../constants.js';

async function getAll() {
  return await get(`${baseSolutionUrl}?sortBy=_createdOn%20desc`);
}

async function getById(solutionId) {
  return await get(`${baseSolutionUrl}/${solutionId}`);
}

async function create(solutionData) {
  const {
    'image-url': imageUrl,
    'more-info': learnMore,
    ...otherData
  } = solutionData;
  return await post(baseSolutionUrl, { imageUrl, learnMore, ...otherData });
}

async function update(solutionId, solutionData) {
  const {
    'image-url': imageUrl,
    'more-info': learnMore,
    ...otherData
  } = solutionData;
  return await put(`${baseSolutionUrl}/${solutionId}`, {
    imageUrl,
    learnMore,
    ...otherData,
  });
}

async function deleteById(solutionId) {
  await del(`${baseSolutionUrl}/${solutionId}`);
}

const solutionService = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
export default solutionService;
