import { createStackNavigator, createAppContainer } from "react-navigation";

import Login from './Login';
import Dashboard from './Dashboard';

//=============APPSTART=========================
const AppNavigator = createStackNavigator({
    login: { screen: Login },
    dashboard: { screen: Dashboard },
},
    {
        initialRouteName: 'login'
    }
);

export default createAppContainer(AppNavigator);