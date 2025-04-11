import { html, render } from 'lit-html';
import itemService from '../api/itemService.js';

const mainEl = document.querySelector('main');

export default async function showDashboardPage() {
  const items = await itemService.getAll();

  render(dashboardTemplate(items), mainEl);
}

function dashboardTemplate(items) {
  return html`
    <h3 class="heading">Our Cars</h3>
    <section id="dashboard">
      ${items.length > 0
        ? html`${items.map((item) => itemTemplate(item))}
    </section>
        `
        : html`<h3 class="nothing">Nothing to see yet</h3> `}
    </section>
  `;
}

function itemTemplate(item) {
  return html`
    <div class="car">
      <img src=${item.imageUrl} alt="example1" />
      <h3 class="model">${item.model}</h3>
      <div class="specs">
        <p class="price">Price: €${item.price}</p>
        <p class="weight">Weight: ${item.weight} kg</p>
        <p class="top-speed">Top Speed: ${item.speed} kph</p>
      </div>
      <a class="details-btn" href="/details/${item._id}">More Info</a>
    </div>
  `;
}
