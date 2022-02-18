/* eslint-disable prettier/prettier */
import Home from '../containers/Home';
import LoginRegister from '../screens/LoginRegister';
import Splash from '../screens/Splash';

const routes = [
  {
    name: 'Splash',
    Component: Splash,
    master: false,
  },
  {
    name: 'Home',
    Component: Home,
    master: false,
    header:false
  },
  {
    name: 'LoginRegister',
    Component: LoginRegister,
    master: true,
    header:false
  },
];

export default routes;
