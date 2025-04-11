import { post, get } from './request.js';
import { baseLikeUrl } from '../constants.js';

async function like(gameId) {
  return await post(baseLikeUrl, { gameId });
}

async function getAllLikes(gameId) {
  return await get(
    `${baseLikeUrl}?where=gameId%3D%22${gameId}%22&distinct=_ownerId&count`
  );
}

async function liked(gameId, userId) {
  return await get(
    `${baseLikeUrl}?where=gameId%3D%22${gameId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
}

const likeService = { like, getAllLikes, liked };
export default likeService;
