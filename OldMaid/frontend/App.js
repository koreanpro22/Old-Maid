import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SplashPage from './components/splash_page';
import GamePage from './components/game_page';

export default function App() {
  return (
    <>
      <GamePage />
    </>
  );
}

