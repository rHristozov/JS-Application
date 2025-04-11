import { html, render } from 'lit-html';

const mainEl = document.querySelector('main');

export default async function showHomePage() {
  render(homeTemplate(), mainEl);
}

function homeTemplate() {
  return html`
    <section id="hero">
      <img src="./images/home.png" alt="home" />
      <p>We know who you are, we will contact you</p>
    </section>
  `;
}
