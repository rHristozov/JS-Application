import { html, render } from 'lit-html';
import page from 'page';

import tattooService from '../api/tattooService.js';

const mainEl = document.querySelector('main');

export default async function showCreatePage() {
  render(createTemplate(), mainEl);
}

function createTemplate() {
  return html`<section id="create">
    <div class="form">
      <h2>Add Post Stamp</h2>
      <form class="create-form" @submit=${createTattooHandler}>
        <input
          type="text"
          name="name-input"
          id="name-input"
          placeholder="Stamp Name"
        />
        <input
          type="text"
          name="image-url-input"
          id="image-url-input"
          placeholder="Image URL"
        />
        <input
          type="number"
          id="year-input"
          name="year-input"
          placeholder="year"
        />
        <textarea
          id="more-info-textarea"
          name="more-info-textarea"
          placeholder="More Info"
          rows="8"
          cols="10"
        ></textarea>
        <button type="submit">Add Stamp</button>
      </form>
    </div>
  </section>`;
}

async function createTattooHandler(e) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const tattooData = Object.fromEntries(formData);

  if (Object.values(tattooData).some((val) => val === '')) {
    return alert('All fields are required!');
  }

  try {
    const result = await tattooService.create(tattooData);
    console.log(result);

    page.redirect('/dashboard');
  } catch (error) {
    alert(error.message);
  }
}
