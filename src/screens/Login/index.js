import { StyleSheet, View,PermissionsAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, StatusBar, Text, VStack } from 'native-base'
import { Colors } from '../../constants/colors'
import FormInput from '../../components/cards/FormInput'
// import Button from '../../components/cards/Button'
import UtilityBtn from '../../components/cards/Button'
import { API } from '../../constants'
import axios from 'axios'
import { Fonts } from '../../../asset/fonts'
import { setAsyncJson } from '../../helpers'
import { useDispatch } from 'react-redux'
import { setUserData } from '../../slices/UserDataSlice'
import messaging from '@react-native-firebase/messaging'

const Login = ({ navigation }) => {

  const dispatch=useDispatch();

  const [formData,setFormData]=useState({
    email:'',
    password:'',
  })

  const validate=()=>{

  }
 
  const Login=()=>{
    const params={
      url:`${API.API_BASEURL}/${API.LOGIN}`,
      method:'post',
      data:formData
    }
    axios(params).then(async res=>{
      dispatch(setUserData(res?.data));
      await setAsyncJson('UserData',res?.data);
      navigation.replace('MyTabs')
    }).catch((e)=>console.log(e))
  }


  return (
    <Box bg={Colors?.White} flex={1}>
      <StatusBar
        backgroundColor={Colors?.White}
        barStyle={'dark-content'}
      />
      <Box mx='5%' >
      <Text allowFontScaling={false} fontSize={{
        base: "50px",
        md: "60px",
        lg: "70px"
      }}
      // bold
      fontFamily={Fonts.Regular}
        color={Colors.Black} mt="50px" letterSpacing='2xl'>GRABit</Text>
      <Text allowFontScaling={false} fontSize={{
        base: "20px",
        md: "60px",
        lg: "70px"
      }}
      // bold
      fontFamily={Fonts.Regular}
      mb={5}
        color={Colors.Black} letterSpacing='2xl'> Login</Text>

        </Box>
        <VStack>
          <FormInput
          isRequired={true}
          label={'Email Address'}
          placeholder={'example@gmail.com'}
          helperText={'Please enter a valid email address.'}
          onChangeText={(value)=>setFormData({...formData,email:value})}
          value={formData.email}
          />
          <FormInput
          isRequired={true}
          label={'Password'}
          placeholder={'Enter Your Password'}
          helperText={'Please enter your password'}
          onChangeText={(value)=>setFormData({...formData,password:value})}
          value={formData.password}
          type='password'
          />
          <UtilityBtn
          text={'Submit'}
          onSubmit={()=>Login()}
          customStyle={{alignSelf:'center'}}
          />
          <Text allowFontScaling={false} 
          onPress={()=>navigation.navigate('SignUp')}
          color='blue.600' mt='3' textAlign={'center'} >Didn't have an account? Signup!</Text>
        </VStack>
    </Box>
  )
}

export default Login

const styles = StyleSheet.create({
})