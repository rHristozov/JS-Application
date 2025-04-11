import { html, render } from 'lit-html';
import page from 'page';

import itemService from '../api/itemService.js';
import showErrorMessage from '../middlewares/errorMessage.js';

const mainEl = document.querySelector('main');

export default async function showCreatePage() {
  render(createTemplate(), mainEl);
}

function createTemplate() {
  return html`
    <section id="create">
      <div class="form form-item">
        <h2>Share Your item</h2>
        <form class="create-form" @submit=${createItemHandler}>
          <input type="text" name="item" id="item" placeholder="Item" />
          <input
            type="text"
            name="imageUrl"
            id="item-image"
            placeholder="Your item Image URL"
          />
          <input
            type="text"
            name="price"
            id="price"
            placeholder="Price in Euro"
          />
          <input
            type="text"
            name="availability"
            id="availability"
            placeholder="Availability Information"
          />
          <input type="text" name="type" id="type" placeholder="Item Type" />
          <textarea
            id="description"
            name="description"
            placeholder="More About The Item"
            rows="10"
            cols="50"
          ></textarea>
          <button type="submit">Add</button>
        </form>
      </div>
    </section>
  `;
}

async function createItemHandler(e) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const itemData = Object.fromEntries(formData);

  if (Object.values(itemData).some((val) => val === '')) {
    showErrorMessage('All fields are required!');
    return;
  }

  try {
    await itemService.create(itemData);
    page.redirect('/dashboard');
  } catch (error) {
    alert(error.message);
  }
}
