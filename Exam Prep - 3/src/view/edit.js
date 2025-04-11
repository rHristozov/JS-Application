import { html, render } from 'lit-html';
import page from 'page';

import itemService from '../api/itemService.js';
import showErrorMessage from '../middlewares/errorMessage.js';

const mainEl = document.querySelector('main');

export default async function showEditPage(ctx) {
  const itemId = ctx.params.id;
  const item = await itemService.getById(itemId);

  render(editTemplate(item), mainEl);
}

function editTemplate(item) {
  return html`
    <section id="edit">
      <div class="form form-item">
        <h2>Edit Your Item</h2>
        <form class="edit-form" @click=${(e) => editHandler(e, item._id)}>
          <input
            type="text"
            name="item"
            id="item"
            placeholder="Item"
            value=${item.item}
          />
          <input
            type="text"
            name="imageUrl"
            id="item-image"
            placeholder="Your item Image URL"
            value=${item.imageUrl}
          />
          <input
            type="text"
            name="price"
            id="price"
            placeholder="Price in Euro"
            value=${item.price}
          />
          <input
            type="text"
            name="availability"
            id="availability"
            placeholder="Availability Information"
            value=${item.availability}
          />
          <input
            type="text"
            name="type"
            id="type"
            placeholder="Item Type"
            value=${item.type}
          />
          <textarea
            id="description"
            name="description"
            placeholder="More About The Item"
            rows="10"
            cols="50"
          >
${item.description}</textarea
          >
          <button type="submit">Edit</button>
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
    showErrorMessage('All fields are required!');
    return;
  }

  try {
    await itemService.update(itemId, itemData);
    page.redirect(`/details/${itemId}`);
  } catch (error) {
    alert(error.message);
  }
}
