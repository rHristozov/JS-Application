import { html, render } from 'lit-html';
import page from 'page';
import droneService from '../api/droneService.js';
import showErrorMessage from '../middlewares/errorMessage.js';

const mainEl = document.querySelector('main');

export default async function showEditPage(ctx) {
  const droneId = ctx.params.id;
  const drone = await droneService.getById(droneId);

  render(editTemplate(drone), mainEl);
}

function editTemplate(drone) {
  return html`
    <section id="edit">
      <div class="form form-item">
        <h2>Edit Offer</h2>
        <form @submit=${(e) => editDrone(e, drone._id)} class="edit-form">
          <input
            type="text"
            name="model"
            id="model"
            placeholder="Drone Model"
            value=${drone.model}
          />
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            placeholder="Image URL"
            value=${drone.imageUrl}
          />
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Price"
            value=${drone.price}
          />
          <input
            type="number"
            name="weight"
            id="weight"
            placeholder="Weight"
            value=${drone.weight}
          />
          <input
            type="number"
            name="phone"
            id="phone"
            placeholder="Phone Number for Contact"
            value=${drone.phone}
          />
          <input
            type="text"
            name="condition"
            id="condition"
            placeholder="Condition"
            value=${drone.condition}
          />
          <textarea
            name="description"
            id="description"
            placeholder="Description"
          >
${drone.description}</textarea
          >
          <button type="submit">Edit</button>
        </form>
      </div>
    </section>
  `;
}

async function editDrone(e, droneId) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const droneData = Object.fromEntries(formData);

  if (Object.values(droneData).some((val) => val === '')) {
    showErrorMessage('All fields are required!');
    return;
  }

  try {
    await droneService.update(droneId, droneData);
    page.redirect(`/details/${droneId}`);
  } catch (error) {
    showErrorMessage(error.message);
  }
}
