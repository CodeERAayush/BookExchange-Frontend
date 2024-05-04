import { StyleSheet, Text, View, PermissionsAndroid,Alert } from 'react-native'
import React, { useEffect } from 'react'
import { NativeBaseProvider } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './src/navigators/stackNavigator'
import { store } from './src/store'
import {Provider} from 'react-redux'
import  FlashMessage from 'react-native-flash-message'
import messaging from '@react-native-firebase/messaging'
import notifee,{AndroidImportance} from '@notifee/react-native';
import { Colors } from './src/constants/colors'
const App = () => {
  // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  useEffect(()=>{
    const unsubscribe = messaging().onMessage(async remoteMessage => {
     console.log('A new FCM message arrived!', JSON.stringify(remoteMessage?.notification?.android));
      await notifee.requestPermission()
      // console.log(perm)
      const channelId = await notifee.createChannel({
        id: `${remoteMessage?.notification?.android?.channelId}`,
        name: 'Sk',
        badge:true
      });
  
      // Display a notification
      await notifee.displayNotification({
        title: `${remoteMessage?.notification?.title}`,
        body: `${remoteMessage?.notification?.body}`,
        android: {
          channelId,
          importance: AndroidImportance.HIGH,
          color:Colors?.Primary,
          largeIcon:remoteMessage?.notification?.android?.imageUrl,
          // optional, defaults to 'ic_launcher'.
          // pressAction is needed if you want the notification to open the app when pressed
          pressAction: {
            id: 'default',
          },
        },
      });
    });

    return unsubscribe;
  },[])
  return (
    <NavigationContainer>
    <NativeBaseProvider>
      <Provider store={store}>
      <FlashMessage position="top" />
    <StackNavigator/>
    </Provider>
    </NativeBaseProvider>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})