import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Parallax from '../../components/Parallax'
import { Colors } from '../../constants/colors'
import { useWindowDimensions } from "react-native";
import { StatusBar } from 'native-base';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../slices/UserDataSlice';
import { getAsync, getAsyncJson } from '../../helpers';
const Splash = ({navigation}) => {
    const { width, height } = useWindowDimensions();
    const dispatch=useDispatch();
    useEffect(()=>{
        fetchDetails(); 
    },[])
    const fetchDetails=async()=>{ 
        const data=await getAsyncJson('UserData');
    setTimeout(()=>{
        data?dispatch(setUserData(data)):null;
        data?navigation.replace('MyTabs'):navigation.replace('Login')
    },2000)}
  return (
    <SafeAreaView style={styles?.container}>
        <StatusBar
        backgroundColor={Colors?.White}
        barStyle={'dark-content'}
        />
   <Parallax
   layers={[require('../../../asset/images/Parallax/1.png'),require('../../../asset/images/Parallax/3.png'),require('../../../asset/images/Parallax/4.png'),require('../../../asset/images/Parallax/5.png')]}
   />
   <ActivityIndicator
   style={{position:'absolute',zIndex:1,bottom:height/5,left:'45%'}}
   size={'large'}
   />
   </SafeAreaView>
  )
}

export default Splash

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors?.White
    }
})