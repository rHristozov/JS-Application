import page from 'page';
import showHomePage from './views/home.js';
import showRegisterPage from './views/register.js';
import showLoginPage from './views/login.js';
import showDashboardPage from './views/dashboard.js';
import showCreatePage from './views/create.js';
import showDetailsPage from './views/details.js';
import showEditPage from './views/edit.js';
import showNavigation from './middlewares/navigation.js';

page(showNavigation);

page('/', showHomePage);
page('/register', showRegisterPage);
page('/login', showLoginPage);

page('/dashboard', showDashboardPage);
page('/create', showCreatePage);
page('/details/:id', showDetailsPage);
page('/edit/:id', showEditPage);

page.start();
