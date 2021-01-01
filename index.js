/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
//import App from './views/App';
import {name as appName} from './app.json';
import App from './views/ComponentDemo';

AppRegistry.registerComponent(appName, () => App);
