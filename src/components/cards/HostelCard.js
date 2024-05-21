import { Pressable, StyleSheet } from 'react-native'
import React from 'react'
import {  HStack, VStack,Text } from 'native-base'
import { Colors } from '../../constants/colors'
import { API } from '../../constants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FastImage from 'react-native-fast-image'
import { Fonts } from '../../../asset/fonts'
import Icon, { Icons } from '../../../asset/Icons/Icons'
const HostelCard = ({item,onPress}) => {
  return (
    <Pressable
    onPress={onPress}
    >
    <HStack bgColor={Colors?.White} shadow={5} rounded={5} mx={5} my={1} p={2} >
        {/* {console.log(`${API.API_BASEURL}/assets/${item?.picturePath}`)} */}
        <FastImage
        source={{uri:`${API.API_BASEURL}/assets/${item?.picturePath}`}}
        style={{width:wp(15),height:wp(15),borderRadius:999}}
        />
        <VStack w={'60%'} justifyContent={'center'}>
          <Text 
          bold
          color={Colors?.Black}
          fontFamily={Fonts?.Regular}
          allowFontScaling={false}>       {item?.hostelName}</Text>
          <HStack>
          <Icon
                type={Icons.EvilIcons}
                name="location"
                color={Colors?.darkYellow}
                style={{height:24,width:24}}
                
              />
        <Text 
        color={Colors?.Black}
        fontFamily={Fonts?.Regular}
        bold
        allowFontScaling={false}>
       {item?.address}
        </Text>
          </HStack>
        </VStack>
      </HStack>
      </Pressable>
  )
}

export default HostelCard

const styles = StyleSheet.create({})