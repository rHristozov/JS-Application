import { html, render } from 'lit-html';
import page from 'page';

import itemService from '../api/itemService.js';

const mainEl = document.querySelector('main');

export default async function showCreatePage() {
  render(createTemplate(), mainEl);
}

function createTemplate() {
  return html`
    <section id="create">
      <div class="form">
        <h2>Add Retro Game</h2>
        <form class="create-form" @submit=${createItemHandler}>
          <input
            type="text"
            name="game-name"
            id="game-name"
            placeholder="Game Name"
          />
          <input
            type="text"
            name="image-url"
            id="image-url"
            placeholder="Image URL"
          />
          <input
            type="text"
            name="platform"
            id="platform"
            placeholder="Platform"
          />
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            rows="2"
            cols="10"
          ></textarea>
          <textarea
            id="release-date"
            name="release-date"
            placeholder="Release Date"
          ></textarea>
          <button type="submit">Add Game</button>
        </form>
      </div>
    </section>
  `;
}

async function createItemHandler(e) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const itemData = Object.fromEntries(formData);
  console.log(itemData);

  if (Object.values(itemData).some((val) => val === '')) {
    return alert('All fields are required!');
  }

  try {
    const result = await itemService.create(itemData);
    console.log(result);

    page.redirect('/dashboard');
  } catch (error) {
    alert(error.message);
  }
}
