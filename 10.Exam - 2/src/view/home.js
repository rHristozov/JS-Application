import { html, render } from 'lit-html';

const mainEl = document.querySelector('main');

export default async function showHomePage() {
  render(homeTemplate(), mainEl);
}

function homeTemplate() {
  return html`
    <section id="hero">
      <div id="hero-wrapper">
        <p id="hero-intro">
          Welcome to <span>Retro Games</span>, your ultimate destination for
          classic gaming! Relive the golden era of video games with our vast
          library of retro titles, spanning from 8-bit to 16-bit classics and
          beyond.
        </p>
        <a href="/register" id="sign-up">Level Up - Sign Up!</a>
      </div>
    </section>
  `;
}
