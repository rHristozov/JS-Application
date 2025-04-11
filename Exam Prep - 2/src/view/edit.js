import { html, render } from 'lit-html';
import page from 'page';

import solutionService from '../api/solutionService.js';

const mainEl = document.querySelector('main');

export default async function showEditPage(ctx) {
  const solutionId = ctx.params.id;
  const solution = await solutionService.getById(solutionId);

  render(editTemplate(solution), mainEl);
}

function editTemplate(solution) {
  return html`
    <section id="edit">
      <div class="form">
        <img class="border" src="./images/border.png" alt="" />
        <h2>Edit Solution</h2>
        <form class="edit-form" @submit=${(e) => editHandler(e, solution._id)}>
          <input
            type="text"
            name="type"
            id="type"
            placeholder="Solution Type"
            value=${solution.type}
          />
          <input
            type="text"
            name="image-url"
            id="image-url"
            placeholder="Image URL"
            value=${solution.imageUrl}
          />
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            rows="2"
            cols="10"
          >
${solution.description}</textarea
          >
          <textarea
            id="more-info"
            name="more-info"
            placeholder="more Info"
            rows="2"
            cols="10"
          >
${solution.learnMore}</textarea
          >
          <button type="submit">Edit</button>
        </form>
      </div>
    </section>
  `;
}

async function editHandler(e, solutionId) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const solutionData = Object.fromEntries(formData);

  if (Object.values(solutionData).some((val) => val === '')) {
    return alert('All fields are required!');
  }

  try {
    const result = await solutionService.update(solutionId, solutionData);
    console.log(result);

    page.redirect(`/details/${solutionId}`);
  } catch (error) {
    alert(error.message);
  }
}
