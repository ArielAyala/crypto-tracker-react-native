
import 'react-native-gesture-handler'; // Debe de estar en primer lugar para que cargue tan pronto cargue la app

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
