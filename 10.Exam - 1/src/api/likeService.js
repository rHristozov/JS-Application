import { post, get } from './request.js';
import { baseLikeUrl } from '../constants.js';

async function like(tattooId) {
  return await post(baseLikeUrl, { stampsId: tattooId });
}

async function getAllLikes(tattooId) {
  return await get(
    `${baseLikeUrl}?where=stampsId%3D%22${tattooId}%22&distinct=_ownerId&count`
  );
}

async function liked(tattooId, userId) {
  return await get(
    `${baseLikeUrl}?where=stampsId%3D%22${tattooId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
}

const likeService = { like, getAllLikes, liked };
export default likeService;
