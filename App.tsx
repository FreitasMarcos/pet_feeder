import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './route/Navigation';
import { UserContextProvider } from './src/Contexts/UserContext';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <View style={styles.container}>
      <UserContextProvider>
        <Navigation />
      </UserContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});