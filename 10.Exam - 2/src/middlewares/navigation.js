import { html, render } from 'lit-html';
import page from 'page';

import { getToken } from '../utils.js';
import userService from '../api/userService.js';
const headerEl = document.querySelector('header');

export default async function showNavigation(ctx, next) {
  const isLogged = getToken();
  render(navigationTemplate(isLogged), headerEl);
  next();
}

function navigationTemplate(isLogged) {
  return html`
    <a id="logo" href="/"
      ><img id="logo-img" src="./images/logo.webp" alt="logo"
    /></a>
    <nav>
      <a href="/dashboard">Games</a>

      ${isLogged
        ? html`
            <div class="user">
              <a href="/create">Add Game</a>
              <a id="logout" @click=${logoutHandler}>Logout</a>
            </div>
          `
        : html`
            <div class="guest">
              <a href="/login">Login</a>
              <a href="/register">Register</a>
            </div>
          `}
    </nav>
  `;
}

async function logoutHandler() {
  try {
    await userService.logout();
    page.redirect('/');
  } catch (error) {
    alert(error.message);
  }
}
