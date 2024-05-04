import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomBtn from '../../reusables/button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Icons } from '../../../asset/Icons/Icons'

const Profile = ({navigation}) => {
  return (
    <View>
     <CustomBtn
     name='poweroff'
     onPress={async ()=>{
      await AsyncStorage.clear()
      navigation.replace('Login')
     }}
     type={Icons?.AntDesign}
     />
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})