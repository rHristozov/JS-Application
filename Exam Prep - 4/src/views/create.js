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
      <div class="form form-auto">
        <h2>Share Your Car</h2>
        <form class="create-form" @submit=${createItemHandler}>
          <input type="text" name="model" id="model" placeholder="Model" />
          <input
            type="text"
            name="imageUrl"
            id="car-image"
            placeholder="Your Car Image URL"
          />
          <input
            type="text"
            name="price"
            id="price"
            placeholder="Price in Euro"
          />
          <input
            type="number"
            name="weight"
            id="weight"
            placeholder="Weight in Kg"
          />
          <input
            type="text"
            name="speed"
            id="speed"
            placeholder="Top Speed in Kmh"
          />
          <textarea
            id="about"
            name="about"
            placeholder="More About The Car"
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
    return alert('All fields are required!');
  }

  try {
    await itemService.create(itemData);
    page.redirect('/dashboard');
  } catch (error) {
    alert(error.message);
  }
}
