import { html, render } from 'lit-html';
import page from 'page';

import { getToken } from '../utils.js';
import usersService from '../api/userService.js';

const headerEl = document.querySelector('header');

export default async function showNavigation(ctx, next) {
  const token = getToken();
  render(navigationTemplate(token), headerEl);
  next();
}

function navigationTemplate(token) {
  return html`
    <a id="logo" href="/"
      ><img id="logo" src="./images/logo2.png" alt="img"
    /></a>
    <nav>
      <div>
        <a href="/dashboard">Marketplace</a>
      </div>
      ${token
        ? html` <div class="user">
            <a href="/create">Sell</a>
            <a @click=${logoutUser}>Logout</a>
          </div>`
        : html` <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>`}
    </nav>
  `;
}

async function logoutUser() {
  try {
    await usersService.logout();
    page.redirect('/');
  } catch (error) {
    alert(error.message);
  }
}
