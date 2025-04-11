import { html, render } from 'lit-html';
import page from 'page';

import solutionService from '../api/solutionService.js';

const mainEl = document.querySelector('main');

export default async function showCreatePage() {
  render(createTemplate(), mainEl);
}

function createTemplate() {
  return html`
    <section id="create">
      <div class="form">
        <img class="border" src="./images/border.png" alt="" />
        <h2>Add Solution</h2>
        <form class="create-form" @submit=${createSolutionHandler}>
          <input
            type="text"
            name="type"
            id="type"
            placeholder="Solution Type"
          />
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
          <textarea
            id="more-info"
            name="more-info"
            placeholder="more Info"
            rows="2"
            cols="10"
          ></textarea>
          <button type="submit">Add Solution</button>
        </form>
      </div>
    </section>
  `;
}

async function createSolutionHandler(e) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const solutionData = Object.fromEntries(formData);

  if (Object.values(solutionData).some((val) => val === '')) {
    return alert('All fields are required!');
  }

  try {
    const result = await solutionService.create(solutionData);
    console.log(result);

    page.redirect('/dashboard');
  } catch (error) {
    alert(error.message);
  }
}
