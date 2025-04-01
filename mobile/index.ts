import { registerRootComponent } from 'expo';
import App from './App';
import { LoginScreen } from './src/screens/LoginScreen';
// import Homescreen from './src/screens/Homescreen';

// 앱을 Expo 환경에서 등록
registerRootComponent(LoginScreen);
