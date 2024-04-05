import { StyleSheet, View, SafeAreaView,ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Box, Pressable, StatusBar, Text, TextArea, VStack } from 'native-base'
import { Colors } from '../../constants/colors'
import FormInput from '../../components/cards/FormInput'
// import Button from '../../components/cards/Button'
import UtilityBtn from '../../components/cards/Button'
import { API } from '../../constants'
import axios from 'axios'
import { Fonts } from '../../../asset/fonts'
import Icon, { Icons } from '../../../asset/Icons/Icons'
const SignUp = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    cnfPass: '',
    firstName: '',
    lastName: '',
    picture: null,
    picturePath: '',
    hostel: '',
    address: ''
  })


  //   {
  //     address
  // "sample address"

  // profileViews
  // 0

  // email
  // "sample@sample.com"

  // firstName
  // "Sample"

  // lastName
  // "User"

  // picture
  // picturePath
  // Screen4.jpg

  // password
  // samplepassword

  // hostel
  // 65fa7bdc70068a75d87901c1
  //   }

  const validate = () => {

  }

  const signUp = () => {
    const data = new FormData()
    data.append(`firstName`, formData?.firstName)
    data.append(`lastName`, formData?.lastName)
    data.append(`email`, formData?.email)
    data.append(`password`, formData?.password)
    data.append(`address`, formData?.address)
    data.append(`hostel`, formData?.hostel)
    data.append(`picture`, formData?.picture)
    data.append(`picturePath`, formData?.picturePath)
    const params = {
      url: `${API.API_BASEURL}/${API.REGISTER}`,
      method: 'post',
      data: data
    }
    axios(params).then(res => console.log(res?.data)).catch((e) => console.log(e))
  }


  return (
    <SafeAreaView backgroundColor={Colors?.White} flex={1}>
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
          color={Colors.Black} letterSpacing='2xl'> Signup</Text>

      </Box>
      <ScrollView
        flex={1}
        contentContainerStyle={{
          paddingBottom:10
        }}
      >
        <Pressable h='20%' w={'90%'} alignItems={'center'} justifyContent={'center'} alignSelf={'center'} rounded={'2xl'} borderWidth='1' borderColor={'gray.300'} >
          <Icon
            type={Icons?.FontAwesome}
            name={'picture-o'}
            size={35}
            color={Colors?.LightGrey}
          />
          <Text mt={1} color={'gray.300'}>Select Profile Image</Text>
        </Pressable>

        <FormInput
          isRequired={true}
          label={'First Name'}
          placeholder={'Enter Your First Name'}
          onChangeText={(value) => setFormData({ ...formData, firstName: value })}
          value={formData.firstName}
        />
        <FormInput
          isRequired={true}
          label={'Last Name'}
          placeholder={'Enter Your Last Name'}
          onChangeText={(value) => setFormData({ ...formData, lastName: value })}
          value={formData.lastName}
        />
          <TextArea
            onChangeText={(value) => setFormData({ ...formData, address: value })}
            h={20} placeholder="Enter Your Address" w="85%" alignSelf={'center'} mt={5}/>
        <FormInput
          isRequired={true}
          label={'Email Address'}
          placeholder={'example@gmail.com'}
          helperText={'Please enter a valid email address.'}
          onChangeText={(value) => setFormData({ ...formData, email: value })}
          value={formData.email}
        />
        <FormInput
          isRequired={true}
          label={'Password'}
          placeholder={'Enter Your Password'}
          helperText={'Please enter your password'}
          onChangeText={(value) => setFormData({ ...formData, password: value })}
          value={formData.email}
        />
        <FormInput
          isRequired={true}
          label={'Password'}
          placeholder={'Enter Your Password'}
          helperText={'Please enter your password'}
          onChangeText={(value) => setFormData({ ...formData, password: value })}
          value={formData.email}
        />
        <FormInput
          isRequired={true}
          label={'Confirm Password'}
          placeholder={'Re-Enter Your Password'}
          helperText={'Please re-enter your password'}
          onChangeText={(value) => setFormData({ ...formData, cnfPass: value })}
          value={formData.email}
        />
        <UtilityBtn
          text={'Submit'}
          onSubmit={() => Login()}
          customStyle={{ alignSelf: 'center' }}
        />
        <Text
          onPress={() => console.log('Sup')}
          color='blue.600' mb={10} mt='3' textAlign={'center'} >Didn't have an account? Signup!</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp

const styles = StyleSheet.create({
})