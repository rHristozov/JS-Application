import { html, render } from 'lit-html';
import solutionService from '../api/solutionService.js';

const mainEl = document.querySelector('main');

export default async function showDashboardPage() {
  const solutions = await solutionService.getAll();

  render(dashboardTemplate(solutions), mainEl);
}

function dashboardTemplate(solutions) {
  return html`
    <h2>Solutions</h2>
    <section id="solutions">
      ${solutions.length > 0
        ? html`${solutions.map((solution) => tattooTemplate(solution))}
    </section>
        `
        : html` <h2 id="no-solution">No Solutions Added.</h2> `}
    </section>
  `;
}

function tattooTemplate(solution) {
  return html`
    <div class="solution">
      <img src=${solution.imageUrl} alt="example1" />
      <div class="solution-info">
        <h3 class="type">${solution.type}</h3>
        <p class="description">${solution.description}</p>
        <a class="details-btn" href="/details/${solution._id}">Learn More</a>
      </div>
    </div>
  `;
}
