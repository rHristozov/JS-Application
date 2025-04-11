import { post, get } from './request.js';
import { baseLikeUrl } from '../constants.js';

async function like(solutionId) {
  return await post(baseLikeUrl, { solutionId });
}

async function getAllLikes(solutionId) {
  return await get(
    `${baseLikeUrl}?where=solutionId%3D%22${solutionId}%22&distinct=_ownerId&count`
  );
}

async function liked(solutionId, userId) {
  return await get(
    `${baseLikeUrl}?where=solutionId%3D%22${solutionId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
}

const likeService = { like, getAllLikes, liked };
export default likeService;
