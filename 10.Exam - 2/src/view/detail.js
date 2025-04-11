import { html, render } from 'lit-html';
import page from 'page';

import itemService from '../api/itemService.js';
import { checkIsOwner, getUserId } from '../utils.js';
import { getToken } from '../utils.js';
import likeService from '../api/likeService.js';

const mainEl = document.querySelector('main');

export default async function showDetailsPage(ctx) {
  const itemId = ctx.params.id;
  const item = await itemService.getById(itemId);
  const userId = getUserId();

  let isLiked = await likeService.liked(itemId, userId);
  console.log(isLiked);

  const isLogged = getToken();
  const isOwner = checkIsOwner(item);

  let likes = await likeService.getAllLikes(itemId);

  render(
    detailsTemplate(item, isOwner, isLogged, likes, isLiked, userId),
    mainEl
  );
}

function detailsTemplate(item, isOwner, isLogged, likes, isLiked, userId) {
  return html`
    <section id="details">
      <div id="details-wrapper">
        <img id="details-img" src=${item.imageUrl}" alt="example1" />
        <div>
          <div id="info-wrapper">
            <p id="game-details-name">${item.name}</p>
            <div id="details-description">
              <p id="details-release-date">Release Date: ${item.releaseDate}</p>
              <p id="description">${item.description}</p>
            </div>
            <h3>Game Likes:<span id="like">${likes}</span></h3>
            <!--Edit and Delete are only for creator-->
            <div id="action-buttons">
              ${isOwner
                ? html`
                    <a href="/edit/${item._id}" id="edit-btn">Edit</a>
                    <a @click=${() => deleteHandler(item._id)} id="delete-btn"
                      >Delete</a
                    >
                  `
                : ''}
              ${isLogged && !isOwner && !isLiked
                ? html`<a
                    href="#"
                    id="like-btn"
                    @click=${() =>
                      likeHandler(item._id, likes, isLiked, userId)}
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

async function deleteHandler(solutionId) {
  const confirmDelete = confirm('Are you want to delete this solution?');

  if (confirmDelete) {
    try {
      await itemService.deleteById(solutionId);
      page.redirect('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  }
}

async function likeHandler(solutionId, likes, isLiked, userId) {
  try {
    await likeService.like(solutionId);
    likes = await likeService.getAllLikes(solutionId);
    isLiked = await likeService.liked(solutionId, userId);
    console.log(isLiked);
  } catch (error) {
    alert(error.message);
  }
}
