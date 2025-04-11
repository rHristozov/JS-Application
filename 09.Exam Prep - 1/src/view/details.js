import { html, render } from 'lit-html';
import page from 'page';

import tattooService from '../api/tattooService.js';
import { checkIsOwner, getUserId } from '../utils.js';
import { getToken } from '../utils.js';
import likeService from '../api/likeService.js';

const mainEl = document.querySelector('main');

export default async function showDetailsPage(ctx) {
  const tattooId = ctx.params.id;
  const tattoo = await tattooService.getById(tattooId);
  const userId = getUserId();

  let isLiked = await likeService.liked(tattooId, userId);
  console.log(isLiked);

  const isLogged = getToken();
  const isOwner = checkIsOwner(tattoo);

  let likes = await likeService.getAllLikes(tattooId);

  render(
    detailsTemplate(tattoo, isOwner, isLogged, likes, isLiked, userId),
    mainEl
  );
}

function detailsTemplate(tattoo, isOwner, isLogged, likes, isLiked, userId) {
  return html`
    <section id="details">
      <div id="details-wrapper">
        <img id="details-img" src=${tattoo.imageUrl} alt="example1" />
        <div>
          <div id="info-wrapper">
            <p id="details-type">${tattoo.type}</p>
            <div id="details-description">
              <p id="user-type">${tattoo.userType}</p>
              <p id="description">${tattoo.description}</p>
            </div>
            <h3>Like tattoo:<span id="like">${likes}</span></h3>
            <div id="action-buttons">
              ${isOwner
                ? html`
                    <a href="/edit/${tattoo._id}" id="edit-btn">Edit</a>
                    <a @click=${() => deleteHandler(tattoo._id)} id="delete-btn"
                      >Delete</a
                    >
                  `
                : ''}
              ${isLogged && !isOwner && !isLiked
                ? html`<a
                    href="#"
                    id="like-btn"
                    @click=${() =>
                      likeHandler(tattoo._id, likes, isLiked, userId)}
                    >Like</a
                  >`
                : ''}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

async function deleteHandler(tattooId) {
  const confirmDelete = confirm('Are you want to delete this tattoo?');

  if (confirmDelete) {
    try {
      await tattooService.deleteById(tattooId);
      page.redirect('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  }
}

async function likeHandler(tattooId, likes, isLiked, userId) {
  try {
    await likeService.like(tattooId);
    likes = await likeService.getAllLikes(tattooId);
    isLiked = await likeService.liked(tattooId, userId);
    console.log(isLiked);
  } catch (error) {
    alert(error.message);
  }
}
