import { html, render } from 'lit-html';
import itemService from '../api/itemService.js';

const mainEl = document.querySelector('main');

export default async function showDashboardPage() {
  const items = await itemService.getAll();

  render(dashboardTemplate(items), mainEl);
}

function dashboardTemplate(items) {
  return html`
    <h2>Games Collection</h2>
    <section id="retro-games">
      ${items.length > 0
        ? html`${items.map((item) => itemTemplate(item))}
    </section>
        `
        : html`<h2 id="no-game">
            No retro games yet, be the first to contribute
          </h2>`}
    </section>
  `;
}

function itemTemplate(item) {
  return html`
    <div class="game">
      <img src=${item.imageUrl} alt="example3" />
      <div class="game-info">
        <h3 class="game-name">${item.name}</h3>
        <p class="platform">Platform: ${item.platform}</p>
        <a class="details-btn" href="/details/${item._id}">See More</a>
      </div>
    </div>
  `;
}
