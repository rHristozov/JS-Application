import { html, render } from 'lit-html';
import itemService from '../api/itemService.js';

const mainEl = document.querySelector('main');

export default async function showDashboardPage() {
  const items = await itemService.getAll();

  render(dashboardTemplate(items), mainEl);
}

function dashboardTemplate(items) {
  return html`
    <h3 class="heading">Market</h3>
    <section id="dashboard">
      ${items.length > 0
        ? html`${items.map((item) => itemTemplate(item))}
    </section>
        `
        : html`<h3 class="empty">No Items Yet</h3>`}
    </section>
  `;
}

function itemTemplate(item) {
  return html`
    <div class="item">
      <img src=${item.imageUrl} alt="example1" />
      <h3 class="model">${item.item}</h3>
      <div class="item-info">
        <p class="price">Price: €${item.price}</p>
        <p class="availability">${item.availability}</p>
        <p class="type">Type: ${item.type}</p>
      </div>
      <a class="details-btn" href="/details/${item._id}">Uncover More</a>
    </div>
  `;
}
