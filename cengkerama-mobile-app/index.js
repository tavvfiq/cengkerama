/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './app/App';
import {name as appName} from './app.json';
import {NotificationService} from './app/services';
import {enableScreens} from 'react-native-screens';

enableScreens();
NotificationService.INIT_NOTIFICATION_SERVICE();

AppRegistry.registerComponent(appName, () => App);
