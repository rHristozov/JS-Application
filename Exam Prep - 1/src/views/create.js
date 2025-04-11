import { html, render } from 'lit-html';
import page from 'page';
import droneService from '../api/droneService.js';
import showErrorMessage from '../middlewares/errorMessage.js';

const mainEl = document.querySelector('main');

export default async function showCreatePage() {
  render(createTemplate(), mainEl);
}

function createTemplate() {
  return html`
    <section id="create">
      <div class="form form-item">
        <h2>Add Drone Offer</h2>
        <form @submit=${createDrone} class="create-form">
          <input
            type="text"
            name="model"
            id="model"
            placeholder="Drone Model"
          />
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            placeholder="Image URL"
          />
          <input type="number" name="price" id="price" placeholder="Price" />
          <input type="number" name="weight" id="weight" placeholder="Weight" />
          <input
            type="number"
            name="phone"
            id="phone"
            placeholder="Phone Number for Contact"
          />
          <input
            type="text"
            name="condition"
            id="condition"
            placeholder="Condition"
          />
          <textarea
            name="description"
            id="description"
            placeholder="Description"
          ></textarea>
          <button type="submit">Add</button>
        </form>
      </div>
    </section>
  `;
}

async function createDrone(e) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const droneData = Object.fromEntries(formData);
  console.log(droneData);

  if (Object.values(droneData).some((val) => val === '')) {
    showErrorMessage('All fields are required!');
    return;
  }

  try {
    const result = await droneService.create(droneData);
    console.log(result);

    page.redirect('/dashboard');
  } catch (error) {
    showErrorMessage(error.message);
  }
}
