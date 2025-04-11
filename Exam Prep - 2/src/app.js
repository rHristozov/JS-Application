import page from 'page';
import showHomePage from './view/home.js';
import showLoginPage from './view/login.js';
import showNavigation from './middlewares/navigation.js';
import showRegisterPage from './view/register.js';
import showDashboardPage from './view/dashboard.js';
import showCreatePage from './view/create.js';
import showDetailsPage from './view/details.js';
import showEditPage from './view/edit.js';

page(showNavigation);
page('/', showHomePage);
page('/login', showLoginPage);
page('/register', showRegisterPage);

page('/dashboard', showDashboardPage);
page('/create', showCreatePage);
page('/details/:id', showDetailsPage);
page('/edit/:id', showEditPage);

page.start();
