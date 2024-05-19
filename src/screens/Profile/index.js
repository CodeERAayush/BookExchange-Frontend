import { Image, StyleSheet, ToastAndroid, View } from 'react-native'
import React, { useEffect,useState } from 'react'
import CustomBtn from '../../reusables/button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon, { Icons } from '../../../asset/Icons/Icons'
import { Box, FlatList, HStack,Text, VStack } from 'native-base'
import { Colors } from '../../constants/colors'
import Header from '../../reusables/Header'
import { useDispatch, useSelector } from 'react-redux'
import { API } from '../../constants'
import axios from 'axios'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Fonts } from '../../../asset/fonts'
import { addMyBook } from '../../slices/ItemsSlice'
import ItemCard from '../../reusables/ItemCard'
import { add_item } from '../../slices/CartSlice'
const Profile = ({navigation}) => {

const {UserData}=useSelector(state=>state.UserData);
const {myBooks}=useSelector(state=>state?.Items)
const [numBooks,setNumBooks]=useState(0)
const dispatch=useDispatch()
const _getAllBooksofuser=()=>{
  const params={
    url:`${API.API_BASEURL}/${API.GET_USER_BOOKS}`,
    method:'POST',
    headers:{
      Authorization:`Bearer ${UserData?.token}`
    }
  }
  axios(params).then(res=>{
    const {numberofBooks,data,success}=res?.data;
    if(success){
      dispatch(addMyBook(data))
setNumBooks(numberofBooks);
    }
  }).catch(e=>console.log(e))
}

useEffect(()=>{
_getAllBooksofuser()
},[])
  return (
    <Box flex={1} bgColor={Colors?.White}>
      {/* {console.log(myBooks)} */}
      <Header
      navigation={navigation}
      heading={UserData?.user?.firstName + " "+ UserData?.user?.lastName}
      dontShowBack={true}
      />
      <HStack mx={5} justifyContent={'space-between'}>
        <Image
        source={{uri:`${API?.API_BASEURL}/assets/${UserData?.user?.picturePath}`}}
        style={{height:hp(15),width:hp(15),borderRadius:999}}
        />
        <VStack width={'60%'}>

        <Text 
        color={Colors?.black90}
        fontFamily={Fonts?.Regular}
        allowFontScaling={false}>
        <Text bold>Email: </Text> {UserData?.user?.email}
        </Text>
        <Text 
        color={Colors?.black90}
        fontFamily={Fonts?.Regular}
        allowFontScaling={false}>
        <Text bold>Address: </Text> 
          {UserData?.user?.address}
        </Text>
        <HStack alignItems={'center'} justifyContent={'space-evenly'}>

        <HStack justifyContent={'center'} bgColor={'violet.300'} p={2} rounded={10} my={5} shadow={5}>
        <Icon
                type={Icons?.EvilIcons}
                name="location"
                color={Colors?.White}
                style={{height:24,width:24}}
                
              />
        <Text 
        color={Colors?.White}
        fontFamily={Fonts?.Regular}
        bold
        allowFontScaling={false}>
       { JSON.parse(UserData?.user?.hostel)?.hostelName}
        </Text>
        
        </HStack>
         <CustomBtn
     name='poweroff'
     onPress={async ()=>{
      await AsyncStorage.clear()
      navigation.replace('Login')
     }}
     type={Icons?.AntDesign}
     />
        </HStack>
        </VStack>
      </HStack>
      <Box flex={1} mx={5}>
        <Text  bold fontFamily={Fonts?.Bold} fontSize={20}>My Products</Text>
        <FlatList
        data={myBooks}
        numColumns={2}
        renderItem={({item,index}) => (
          <ItemCard
          item={item}
          naviagtion={navigation}
          key={index}
          onPressCart={()=>{
            dispatch(add_item(item))
            ToastAndroid.show("Item added to cart!",ToastAndroid.CENTER)
          }}
          />
        )}
        ListFooterComponent={()=><Box height={hp(15)} width={wp(100)}/>}
        />
      </Box>
     {/* <CustomBtn
     name='poweroff'
     onPress={async ()=>{
      await AsyncStorage.clear()
      navigation.replace('Login')
     }}
     type={Icons?.AntDesign}
     /> */}
    </Box>
  )
}

export default Profile

const styles = StyleSheet.create({})