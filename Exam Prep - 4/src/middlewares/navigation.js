import { html, render } from 'lit-html';
import page from 'page';

import { getToken } from '../utils.js';
import usersService from '../api/userService.js';

const headerEl = document.querySelector('header');

export default async function showNavigation(ctx, next) {
  const isLogged = getToken();
  render(navigationTemplate(isLogged), headerEl);
  next();
}

function navigationTemplate(isLogged) {
  return html`
    <a id="logo" href="/"
      ><img id="logo-car" src="./images/car-logo.png" alt="img"
    /></a>
    <nav>
      <div>
        <a href="/dashboard">Our Cars</a>
        <a href="/search">Search</a>
      </div>

      ${isLogged
        ? html`
            <div class="user">
              <a href="/create">Add Your Car</a>
              <a @click=${logoutHandler}>Logout</a>
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
    await usersService.logout();
    page.redirect('/');
  } catch (error) {
    alert(error.message);
  }
}
