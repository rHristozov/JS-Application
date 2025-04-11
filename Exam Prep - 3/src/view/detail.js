import { html, render } from 'lit-html';
import page from 'page';

import itemService from '../api/itemService.js';
import { checkIsOwner } from '../utils.js';

const mainEl = document.querySelector('main');

export default async function showDetailsPage(ctx) {
  const itemId = ctx.params.id;
  const item = await itemService.getById(itemId);

  const isOwner = checkIsOwner(item);

  render(detailsTemplate(item, isOwner), mainEl);
}

function detailsTemplate(item, isOwner) {
  return html`
    <section id="details">
      <div id="details-wrapper">
        <div>
          <img id="details-img" src=${item.imageUrl} alt="example1" />
          <p id="details-title">${item.item}</p>
        </div>
        <div id="info-wrapper">
          <div id="details-description">
            <p class="details-price">Price: €${item.price}</p>
            <p class="details-availability">${item.availability}</p>
            <p class="type">Type: ${item.type}</p>
            <p id="item-description">${item.description}</p>
          </div>
          <!--Edit and Delete are only for creator-->
          ${isOwner
            ? html`
                <div id="action-buttons">
                  <a href="/edit/${item._id}" id="edit-btn">Edit</a>
                  <a @click=${() => deleteHandler(item._id)} id="delete-btn"
                    >Delete</a
                  >
                </div>
              `
            : ''}
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
