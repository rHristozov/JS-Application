import { html, render } from 'lit-html';
import page from 'page';
import usersService from '../api/userService.js';
import showErrorMessage from '../middlewares/errorMessage.js';

const mainEl = document.querySelector('main');

export default async function showRegisterPage() {
  render(registerTemplate(), mainEl);
}

function registerTemplate() {
  return html`
    <section id="register">
      <div class="form">
        <h2>Register</h2>
        <form @submit=${registerUser} class="register-form">
          <input
            type="text"
            name="email"
            id="register-email"
            placeholder="email"
          />
          <input
            type="password"
            name="password"
            id="register-password"
            placeholder="password"
          />
          <input
            type="password"
            name="re-password"
            id="repeat-password"
            placeholder="repeat password"
          />
          <button type="submit">register</button>
          <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
      </div>
    </section>
  `;
}

async function registerUser(e) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const userData = Object.fromEntries(formData);

  if (!userData.email || !userData.password || !userData['re-password']) {
    showErrorMessage('All fields are required');
    return;
  }

  if (userData['password'] !== userData['re-password']) {
    showErrorMessage("Passwords don't match");
    return;
  }

  try {
    await usersService.register(userData);
    page.redirect('/');
  } catch (error) {
    showErrorMessage(error.message);
  }
}
