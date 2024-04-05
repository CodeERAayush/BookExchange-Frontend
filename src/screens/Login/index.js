import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Box, StatusBar, Text, VStack } from 'native-base'
import { Colors } from '../../constants/colors'
import FormInput from '../../components/cards/FormInput'
// import Button from '../../components/cards/Button'
import UtilityBtn from '../../components/cards/Button'
import { API } from '../../constants'
import axios from 'axios'
import { Fonts } from '../../../asset/fonts'
const Login = ({ navigation }) => {

  const [formData,setFormData]=useState({
    email:'',
    password:'',
  })

  const validate=()=>{

  }

  const Login=()=>{
    console.log(formData)
    const params={
      url:`${API.API_BASEURL}/${API.LOGIN}`,
      method:'post',
      data:formData
    }
    axios(params).then(res=>console.log(res?.data)).catch((e)=>console.log(e))
  }


  return (
    <Box bg={Colors?.White} flex={1}>
      <StatusBar
        backgroundColor={Colors?.White}
        barStyle={'dark-content'}
      />
      <Box mx='5%' >
      <Text fontSize={{
        base: "50px",
        md: "60px",
        lg: "70px"
      }}
      // bold
      fontFamily={Fonts.Regular}
        color={Colors.Black} mt="50px" letterSpacing='2xl'>GRABit</Text>
      <Text fontSize={{
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
          value={formData.email}
          />
          <UtilityBtn
          text={'Submit'}
          onSubmit={()=>Login()}
          customStyle={{alignSelf:'center'}}
          />
          <Text 
          onPress={()=>navigation.navigate('SignUp')}
          color='blue.600' mt='3' textAlign={'center'} >Didn't have an account? Signup!</Text>
        </VStack>
    </Box>
  )
}

export default Login

const styles = StyleSheet.create({
})