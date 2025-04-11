import { html, render } from 'lit-html';
import tattooService from '../api/tattooService.js';

const mainEl = document.querySelector('main');

export default async function showDashboardPage() {
  const tattoos = await tattooService.getAll();

  render(dashboardTemplate(tattoos), mainEl);
}

function dashboardTemplate(tattoos) {
  return html`
    <h2>Collection</h2>
    <section id="collection">
      ${tattoos.length > 0
        ? html`${tattoos.map((tattoo) => tattooTemplate(tattoo))}`
        : html`<h2 id="no-stamp">No Stamps Added.</h2>`}
    </section>
  `;
}

function tattooTemplate(tattoo) {
  return html`
    <div class="stamp">
      <img src=${tattoo.imageUrl} />
      <div class="stamp-info">
        <h3 class="name">${tattoo.name}</h3>
        <p class="year-description">
          Year of oldest stamps - <span class="year">${tattoo.year}</span>
        </p>
        <a class="learn-more-btn" href="/details/${tattoo._id}">Learn More</a>
      </div>
    </div>
  `;
}
