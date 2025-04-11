import { html, render } from 'lit-html';
import userService from '../api/userService.js';
import page from 'page';

const mainEl = document.querySelector('main');

export default async function showLoginPage() {
  render(loginTemplate(), mainEl);
}

function loginTemplate() {
  return html`
    <section id="login">
      <div class="form">
        <h2>Login</h2>
        <form class="login-form" @submit=${loginHandler}>
          <input type="text" name="email" id="email" placeholder="email" />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
          <button type="submit">login</button>
          <p class="message">
            Not registered? <a href="/register">Create an account</a>
          </p>
        </form>
      </div>
    </section>
  `;
}

async function loginHandler(e) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const userData = Object.fromEntries(formData);

  if (!userData.email || !userData.password) {
    return alert('All fields are required!');
  }

  try {
    await userService.login(userData);
    page.redirect('/');
  } catch (error) {
    alert(error.message);
  }
}
