/* eslint-disable prettier/prettier */
import InspireMe from '../screens/InspireMe';
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
    name: 'Inspire Me',
    Component: InspireMe,
    Icon: InspireMeIcon,
    ActiveIcon: InspireMeActiveIcon,
    header: true,
  },
  {
    name: 'Get Me Fit',
    Component: InspireMe,
    Icon: GetMeFitIcon,
    ActiveIcon: GetMeFitActiveIcon,
    header: true,
  },
  {
    name: 'Train Me',
    Component: InspireMe,
    Icon: TrainMeIcon,
    ActiveIcon: TrainMeActiveIcon,
    header: false,
  },
  {
    name: 'Mental Training',
    Component: InspireMe,
    Icon: MentalTrainingIcon,
    ActiveIcon: MentalTrainingActiveIcon,
    header: false,
  },
  {
    name: 'POV',
    Component: InspireMe,
    Icon: POVIcon,
    ActiveIcon: POVActiveIcon,
    header: false,
  },
];

export default routes;
