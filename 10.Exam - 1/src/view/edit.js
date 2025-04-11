import { html, render } from 'lit-html';
import page from 'page';

import tattooService from '../api/tattooService.js';

const mainEl = document.querySelector('main');

export default async function showEditPage(ctx) {
  const tattooId = ctx.params.id;
  const tattoo = await tattooService.getById(tattooId);

  render(editTemplate(tattoo), mainEl);
}

function editTemplate(tattoo) {
  return html`
    <section id="edit">
      <div class="form">
        <h2>Edit Post Stamp</h2>
        <form class="edit-form" @submit=${(e) => editHandler(e, tattoo._id)}>
          <input
            type="text"
            name="name-input"
            id="name"
            placeholder="Stamp Name"
            value=${tattoo.name}
          />
          <input
            type="text"
            name="image-url-input"
            id="image-url"
            placeholder="Image URL"
            value=${tattoo.imageUrl}
          />
          <input
            type="number"
            id="year-input"
            name="year-input"
            placeholder="Year"
            value=${tattoo.year}
          />
          <textarea
            id="more-info"
            name="more-info-textarea"
            placeholder="More Info"
            rows="8"
            cols="10"
          >
${tattoo.learnMore}</textarea
          >
          <button type="submit">Edit</button>
        </form>
      </div>
    </section>
  `;
}

async function editHandler(e, tattooId) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const tattooData = Object.fromEntries(formData);

  if (Object.values(tattooData).some((val) => val === '')) {
    return alert('All fields are required!');
  }

  try {
    await tattooService.update(tattooId, tattooData);

    page.redirect(`/details/${tattooId}`);
  } catch (error) {
    alert(error.message);
  }
}
