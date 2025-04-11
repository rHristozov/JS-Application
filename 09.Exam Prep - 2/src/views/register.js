import { html, render } from 'lit-html';
import page from 'page';
import usersService from '../api/usersService.js';

const mainEl = document.querySelector('main');

export default async function showRegisterPage() {
  render(registerTemplate(), mainEl);
}

function registerTemplate() {
  return html`
    <section id="register">
      <div class="form">
        <h2>Register</h2>
        <form class="register-form" @submit=${registerUser}>
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
          <p class="message">Already registered? <a href="#">Login</a></p>
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
    return alert('All fields are required!');
  }

  if (userData['password'] !== userData['re-password']) {
    return alert('Password must match!');
  }

  try {
    await usersService.register(userData);
    page.redirect('/');
  } catch (error) {
    alert(error.message);
  }
}
