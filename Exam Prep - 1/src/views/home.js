import { html, render } from 'lit-html';
import page from 'page';

const mainEl = document.querySelector('main');

export default async function showHomePage() {
  render(homeTemplate(), mainEl);
}

function homeTemplate() {
  return html`
    <section id="hero">
      <p>
        Discover the best deals on drones! Buy, sell, and trade top-quality
        drones with ease on Drone Deals - your trusted marketplace for all
        things drone.
      </p>
    </section>
  `;
}
