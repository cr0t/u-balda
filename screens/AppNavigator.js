import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import GameScreen from './GameScreen';
import SettingsScreen from './SettingsScreen';

export default createAppContainer(createStackNavigator({
  Home: { screen: HomeScreen },
  Game: { screen: GameScreen },
  Settings: { screen: SettingsScreen },
}));
