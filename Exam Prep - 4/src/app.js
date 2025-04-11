import page from 'page';
import showNavigation from './middlewares/navigation.js';
import showHomePage from './views/home.js';
import showLoginPage from './views/login.js';
import showRegisterPage from './views/register.js';
import showDashboardPage from './views/dashboard.js';
import showDetailsPage from './views/details.js';
import showCreatePage from './views/create.js';
import showEditPage from './views/edit.js';
import showSearchPage from './views/search.js';

page(showNavigation);

page('/', showHomePage);
page('/login', showLoginPage);
page('/register', showRegisterPage);

page('/dashboard', showDashboardPage);
page('/create', showCreatePage);
page('/details/:id', showDetailsPage);
page('/edit/:id', showEditPage);
page('/search', showSearchPage);

page.start();

console.log('das');
