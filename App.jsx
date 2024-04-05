import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NativeBaseProvider } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './src/navigators/stackNavigator'
const App = () => {
  return (
    <NavigationContainer>
    <NativeBaseProvider>
    <StackNavigator/>
    </NativeBaseProvider>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})