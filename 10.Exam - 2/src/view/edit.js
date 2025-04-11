import { html, render } from 'lit-html';
import page from 'page';

import itemService from '../api/itemService.js';

const mainEl = document.querySelector('main');

export default async function showEditPage(ctx) {
  const itemId = ctx.params.id;
  const item = await itemService.getById(itemId);

  render(editTemplate(item), mainEl);
}

function editTemplate(item) {
  return html`
    <section id="edit">
      <div class="form">
        <h2>Edit Retro Game</h2>
        <form class="edit-form" @submit=${(e) => editHandler(e, item._id)}>
          <input
            type="text"
            name="game-name"
            id="game-name"
            placeholder="Game Name"
            value=${item.name}
          />
          <input
            type="text"
            name="image-url"
            id="image-url"
            placeholder="Image URL"
            value=${item.imageUrl}
          />
          <input
            type="text"
            name="platform"
            id="platform"
            placeholder="Platform"
            value=${item.platform}
          />
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            rows="2"
            cols="10"
          >
${item.description}</textarea
          >
          <textarea
            id="release-date"
            name="release-date"
            placeholder="Release Date"
          >
${item.releaseDate}</textarea
          >
          <button type="submit">Edit Game</button>
        </form>
      </div>
    </section>
  `;
}

async function editHandler(e, itemId) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const itemData = Object.fromEntries(formData);

  if (Object.values(itemData).some((val) => val === '')) {
    return alert('All fields are required!');
  }

  try {
    await itemService.update(itemId, itemData);
    page.redirect(`/details/${itemId}`);
  } catch (error) {
    alert(error.message);
  }
}
