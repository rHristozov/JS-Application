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
      <div class="form form-auto">
        <h2>Edit Your Car</h2>
        <form class="edit-form" @click=${(e) => editHandler(e, item._id)}>
          <input
            type="text"
            name="model"
            id="model"
            placeholder="Model"
            value=${item.model}
          />
          <input
            type="text"
            name="imageUrl"
            id="car-image"
            placeholder="Your Car Image URL"
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
            type="number"
            name="weight"
            id="weight"
            placeholder="Weight in Kg"
            value=${item.weight}
          />
          <input
            type="text"
            name="speed"
            id="speed"
            placeholder="Top Speed in Kmh"
            value=${item.speed}
          />
          <textarea
            id="about"
            name="about"
            placeholder="More About The Car"
            rows="10"
            cols="50"
          >
${item.about}</textarea
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
    return alert('All fields are required!');
  }

  try {
    await itemService.update(itemId, itemData);
    page.redirect(`/details/${itemId}`);
  } catch (error) {
    alert(error.message);
  }
}
