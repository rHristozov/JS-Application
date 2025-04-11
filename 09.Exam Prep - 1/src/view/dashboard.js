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
    <section id="tattoos">
      <!-- Display a div with information about every post (if any)-->
      ${tattoos.length > 0
        ? html`${tattoos.map((tattoo) => tattooTemplate(tattoo))}`
        : html`
            <h2 id="no-tattoo">
              Collection is empty, be the first to contribute
            </h2>
          `}
    </section>
    <!-- Display an h2 if there are no posts -->
  `;
}

function tattooTemplate(tattoo) {
  return html`
    <div class="tattoo">
      <img src=${tattoo.imageUrl} alt="example1" />
      <div class="tattoo-info">
        <h3 class="type">${tattoo.type}</h3>
        <span>Uploaded by </span>
        <p class="user-type">${tattoo.userType}</p>
        <a class="details-btn" href="/details/${tattoo._id}">Learn More</a>
      </div>
    </div>
  `;
}
