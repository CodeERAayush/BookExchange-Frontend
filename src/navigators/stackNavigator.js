import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import Home from '../screens/HomeScreen'
import HostelSign from '../screens/Hostel'
import Profile from '../screens/Profile'
import Splash from '../screens/SplashScreen'
import BottomTabNavigator from './bottomNavigator'
import Cart from '../screens/Cart'
const StackNavigator = () => {
  const Stack=createStackNavigator()
    return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="SplashScreen" component={Splash}/>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='SignUp' component={SignUp}/>
        <Stack.Screen name='HostelSign' component={HostelSign}/>
        <Stack.Screen name='MyTabs' component={BottomTabNavigator}/>
        <Stack.Screen name='Cart' component={Cart}/>
    </Stack.Navigator>
  )
}

export default StackNavigator
