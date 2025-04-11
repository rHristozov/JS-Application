import { html, render } from 'lit-html';

const mainEl = document.querySelector('main');

export default async function showHomePage() {
  render(homeTemplate(), mainEl);
}

function homeTemplate() {
  return html`
    <section id="hero">
      <h1>
        Accelerate Your Passion Unleash the Thrill of Sport Cars Together!
      </h1>
    </section>
  `;
}
