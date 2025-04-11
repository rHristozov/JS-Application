import { html, render } from 'lit-html';
import userService from '../api/userService.js';
import page from 'page';

const mainEl = document.querySelector('main');

export default async function showRegisterPage() {
  render(registerTemplate(), mainEl);
}

function registerTemplate() {
  return html`
    <section id="register">
      <div class="form">
        <h2>Register</h2>
        <form class="register-form" @submit=${registerHandler}>
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

async function registerHandler(e) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const userData = Object.fromEntries(formData);
  console.log(userData);

  if (!userData.email || !userData.password || !userData['re-password']) {
    showErrorMessage('All fields are required!');
    return;
  }

  if (userData['password'] !== userData['re-password']) {
    return alert("Passwords don't match");
  }

  try {
    await userService.register(userData);
    page.redirect('/');
  } catch (error) {
    alert(error.message);
  }
}
