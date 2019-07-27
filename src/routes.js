import { LoginContainer } from './login';
import HomeContainer from './home';
import LogsContainer from './logs';
import SettingsContainer from './settings';

const routes = {
  preLoginRoutes: [
    {
      path: '/',
      component: LoginContainer,
      exact: true,
      usertype: ["admin", "user"]
    }
  ],
  postLoginRoutes: [
    {
      path: '/home',
      component: HomeContainer,
      exact: true,
      usertype: ["admin", "user"]
    },
    {
      path: '/logs',
      component: LogsContainer,
      exact: true,
      usertype: ["admin", "user"]
    },
    {
      path: '/settings',
      component: SettingsContainer,
      exact: true,
      usertype: ["admin"]
    },
  ],
};

export default routes;
