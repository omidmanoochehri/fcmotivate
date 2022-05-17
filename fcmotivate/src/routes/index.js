/* eslint-disable prettier/prettier */
import Home from '../containers/Home';
import InspireMe from '../screens/InspireMe';
import LoginRegister from '../screens/LoginRegister';
import Splash from '../screens/Splash';
import SelectPosition from '../screens/SelectPostion';
import SelectCategories from '../screens/SelectCategories';
import RecoverMe from '../screens/RecoverMe';
import QuoteSettings from '../screens/QuoteSettings';
import MentalTraining from '../screens/MentalTraining';
import GetMeFit from '../screens/GetMeFit';
import POV from '../screens/POV';
import TrainMe from '../screens/TrainMe';
import MotivateMe from '../screens/MotivateMe';
import Quotes from '../screens/Quotes';
import InspireMeIcon from '../utils/svg/inspire_me.svg';
import GetMeFitIcon from '../utils/svg/get_me_fit.svg';
import TrainMeIcon from '../utils/svg/train_me.svg';
import MentalTrainingIcon from '../utils/svg/mental_training.svg';
import POVIcon from '../utils/svg/pov.svg';
import InspireMeActiveIcon from '../utils/svg/inspire_me_active.svg';
import GetMeFitActiveIcon from '../utils/svg/get_me_fit_active.svg';
import TrainMeActiveIcon from '../utils/svg/train_me_active.svg';
import MentalTrainingActiveIcon from '../utils/svg/mental_training_active.svg';
import POVActiveIcon from '../utils/svg/pov_active.svg';

const routes = [
  {
    name: 'Splash',
    Component: Splash,
    master: false,
    has_icon: false,
    Icon: InspireMeIcon,
    ActiveIcon: InspireMeActiveIcon,
  },
  {
    name: 'Home',
    Component: Home,
    Icon: InspireMeIcon,
    ActiveIcon: InspireMeActiveIcon,
    master: false,
    header: false,
    has_icon: true,
  },
  {
    name: 'LoginRegister',
    Component: LoginRegister,
    master: true,
    header: false,
    has_icon: false,
    Icon: InspireMeIcon,
    ActiveIcon: InspireMeActiveIcon,
  },
  {
    name: 'SelectPosition',
    Component: SelectPosition,
    master: true,
    header: false,
    has_icon: false,
    Icon: InspireMeIcon,
    ActiveIcon: InspireMeActiveIcon,
  },
  {
    name: 'SelectCategories',
    Component: SelectCategories,
    master: true,
    header: false,
    has_icon: false,
    Icon: InspireMeIcon,
    ActiveIcon: InspireMeActiveIcon,
  },
  {
    name: 'QuoteSettings',
    Component: QuoteSettings,
    master: true,
    header: false,
    has_icon: false,
    Icon: InspireMeIcon,
    ActiveIcon: InspireMeActiveIcon,
  },
  {
    name: 'RecoverMe',
    Component: RecoverMe,
    master: true,
    header: true,
    has_icon: false,
    Icon: InspireMeIcon,
    ActiveIcon: InspireMeActiveIcon,
  },
  {
    name: 'MentalTraining',
    Component: MentalTraining,
    Icon: MentalTrainingIcon,
    ActiveIcon: MentalTrainingActiveIcon,
    master: true,
    header: true,
    has_icon: true,
  },
  {
    name: 'GetMeFit',
    Component: GetMeFit,
    Icon: GetMeFitIcon,
    ActiveIcon: GetMeFitActiveIcon,
    master: true,
    header: true,
    has_icon: true,
  },
  {
    name: 'POV',
    Component: POV,
    Icon: POVIcon,
    ActiveIcon: POVActiveIcon,
    master: true,
    header: true,
    has_icon: true,
  },
  {
    name: 'TrainMe',
    Component: TrainMe,
    Icon: TrainMeIcon,
    ActiveIcon: TrainMeActiveIcon,
    master: true,
    header: true,
    has_icon: true,
  },
  {
    name: 'MotivateMe',
    Component: MotivateMe,
    master: true,
    header: true,
    has_icon: false,
    Icon: InspireMeIcon,
    ActiveIcon: InspireMeActiveIcon,
  },
  {
    name: 'Quotes',
    Component: Quotes,
    master: true,
    header: true,
    has_icon: false,
    Icon: InspireMeIcon,
    ActiveIcon: InspireMeActiveIcon,
  },
];

export default routes;
