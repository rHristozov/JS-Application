import { html, render } from 'lit-html';
import page from 'page';
import itemService from '../api/itemService.js';

const mainEl = document.querySelector('main');

export default async function showSearchPage(ctx, next, matches = null) {
  render(searchTemplate(matches), mainEl);
}

function searchTemplate(matches) {
  return html`
    <section id="search">
      <div class="form">
        <h4>Search</h4>
        <form class="search-form" @submit=${searchShows}>
          <input type="text" name="search" id="search-input" />
          <button class="button-list">Search</button>
        </form>
      </div>
      <div class="search-result">${resultTemplate(matches)}</div>
    </section>
  `;
}

function resultTemplate(matches) {
  if (matches === null) {
    return html`<h2 class="no-avaliable">No result.</h2>`;
  }

  if (matches.length === 0 || matches === null) {
    return html`<h2 class="no-avaliable">No result.</h2>`;
  }

  return html`${matches.map((m) => showTemplate(m))};`;
}

function showTemplate(item) {
  return html`
    <div class="car">
      <img src=${item.imageUrl} alt="example1" />
      <h3 class="model">${item.model}</h3>
      <a class="details-btn" href="/details/${item._id}">More Info</a>
    </div>
  </div>
  `;
}

async function searchShows(e) {
  e.preventDefault();

  const formDate = new FormData(e.currentTarget);
  const titleSearch = formDate.get('search');
  console.log(titleSearch);

  if (!titleSearch) {
    return alert('All fields are required!');
  }

  try {
    const result = await itemService.getByTitle(titleSearch);
    console.log(result);

    showSearchPage(null, null, result);
  } catch (error) {
    alert(error.message);
  }
}
