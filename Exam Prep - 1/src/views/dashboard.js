import { html, render } from 'lit-html';
import droneService from '../api/droneService.js';

const mainEl = document.querySelector('main');

export default async function showDashboardPage() {
  const drones = await droneService.getAll();
  render(dashboardTemplate(drones), mainEl);
}

function dashboardTemplate(drones) {
  return html`
    <h3 class="heading">Marketplace</h3>
    ${drones.length > 0
      ? html`<section id="dashboard">
          ${drones.map((drone) => droneTemplate(drone))}
        </section>`
      : html`<h3 class="no-drones">No Drones Available</h3>`}
  `;
}

function droneTemplate(drone) {
  return html`
    <div class="drone">
      <img src=${drone.imageUrl} alt="example1" />
      <h3 class="model">${drone.model}</h3>
      <div class="drone-info">
        <p class="price">Price: €${drone.price}</p>
        <p class="condition">Condition: ${drone.condition}</p>
        <p class="weight">Weight: ${drone.weight}g</p>
      </div>
      <a class="details-btn" href="/details/${drone._id}">Details</a>
    </div>
  `;
}
