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
      <h2>Add tattoo</h2>
      <form class="create-form" @submit=${createTattooHandler}>
        <input type="text" name="type" id="type" placeholder="Tattoo Type" />
        <input
          type="text"
          name="image-url"
          id="image-url"
          placeholder="Image URL"
        />
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          rows="2"
          cols="10"
        ></textarea>
        <select id="user-type" name="user-type">
          <option value="" disabled selected>Select your role</option>
          <option value="Tattoo Artist">Tattoo Artist</option>
          <option value="Tattoo Enthusiast">Tattoo Enthusiast</option>
          <option value="First Time in Tattoo">First Time in Tattoo</option>
          <option value="Tattoo Collector">Tattoo Collector</option>
        </select>
        <button type="submit">Add tattoo</button>
      </form>
    </div>
  </section> `;
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
