import { html, render } from 'lit-html';
import page from 'page';

import solutionService from '../api/solutionService.js';
import { checkIsOwner, getUserId } from '../utils.js';
import { getToken } from '../utils.js';
import likeService from '../api/likeService.js';

const mainEl = document.querySelector('main');

export default async function showDetailsPage(ctx) {
  const solutionId = ctx.params.id;
  const solution = await solutionService.getById(solutionId);
  const userId = getUserId();

  let isLiked = await likeService.liked(solutionId, userId);
  console.log(isLiked);

  const isLogged = getToken();
  const isOwner = checkIsOwner(solution);

  let likes = await likeService.getAllLikes(solutionId);

  render(
    detailsTemplate(solution, isOwner, isLogged, likes, isLiked, userId),
    mainEl
  );
}

function detailsTemplate(solution, isOwner, isLogged, likes, isLiked, userId) {
  return html`
    <section id="details">
  <div id="details-wrapper">
    <img id="details-img" src=${solution.imageUrl} alt="example1" />
    <div>
      <p id="details-type">${solution.type}</p>
      <div id="info-wrapper">
        <div id="details-description">
          <p id="description">${solution.description}</p>
          <p id="more-info">${solution.learnMore}</p>
        </div>
      </div>
      <h3>Like Solution:<span id="like">${likes}</span></h3>

      <!--Edit and Delete are only for creator-->
      <div id="action-buttons">
              ${
                isOwner
                  ? html`
                      <a href="/edit/${solution._id}" id="edit-btn">Edit</a>
                      <a
                        @click=${() => deleteHandler(solution._id)}
                        id="delete-btn"
                        >Delete</a
                      >
                    `
                  : ''
              }
              ${
                isLogged && !isOwner && !isLiked
                  ? html`<a
                      href="#"
                      id="like-btn"
                      @click=${() =>
                        likeHandler(solution._id, likes, isLiked, userId)}
                      >Like</a
                    >`
                  : ''
              }
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
      await solutionService.deleteById(solutionId);
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
