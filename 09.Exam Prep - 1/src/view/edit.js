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
        <h2>Edit tattoo</h2>
        <form class="edit-form" @submit=${(e) => editHandler(e, tattoo._id)}>
          <input
            type="text"
            name="type"
            id="type"
            placeholder="Tattoo Type"
            value=${tattoo.type}
          />
          <input
            type="text"
            name="image-url"
            id="image-url"
            placeholder="Image URL"
            value=${tattoo.imageUrl}
          />
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            rows="2"
            cols="10"
          >
${tattoo.description}</textarea
          >
          <select id="user-type" name="user-type" .value=${tattoo.userType}>
            <option value="" disabled selected>Select your role</option>
            <option value="Tattoo Artist">Tattoo Artist</option>
            <option value="Tattoo Enthusiast">Tattoo Enthusiast</option>
            <option value="First Time in Tattoo">First Time in Tattoo</option>
            <option value="Tattoo Collector">Tattoo Collector</option>
          </select>
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
    const result = await tattooService.update(tattooId, tattooData);
    console.log(result);

    page.redirect(`/details/${tattooId}`);
  } catch (error) {
    alert(error.message);
  }
}
