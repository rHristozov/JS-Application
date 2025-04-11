import { html, render } from 'lit-html';
import page from 'page';
import droneService from '../api/droneService.js';
import { checkIsOwner } from '../utils.js';

const mainEl = document.querySelector('main');

export default async function showDetailsPage(ctx) {
  const droneId = ctx.params.id;
  const drone = await droneService.getById(droneId);

  const isOwner = checkIsOwner(drone);

  render(detailsTemplate(drone, isOwner), mainEl);
}

function detailsTemplate(drone, isOwner) {
  return html`
    <section id="details">
      <div id="details-wrapper">
        <div>
          <img id="details-img" src=${drone.imageUrl} alt="example1" />
          <p id="details-model">${drone.model}</p>
        </div>
        <div id="info-wrapper">
          <div id="details-description">
            <p class="details-price">Price: €${drone.price}</p>
            <p class="details-condition">Condition: ${drone.condition}</p>
            <p class="details-weight">Weight: ${drone.weight}g</p>
            <p class="drone-description">${drone.description}</p>
            <p class="phone-number">Phone: ${drone.phone}</p>
          </div>
          ${isOwner
            ? html`<div class="buttons">
                <a href="/edit/${drone._id}" id="edit-btn">Edit</a>
                <a @click=${() => deleteDrone(drone._id)} id="delete-btn"
                  >Delete</a
                >
              </div>`
            : ''}
        </div>
      </div>
    </section>
  `;
}

async function deleteDrone(droneId) {
  const confirmDelete = confirm('Are you want to delete this drone?');

  if (confirmDelete) {
    try {
      await droneService.deleteById(droneId);
      page.redirect('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  }
}
