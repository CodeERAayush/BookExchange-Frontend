import { StyleSheet, Text, View,Pressable, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Fonts } from '../../../asset/fonts'
import { Colors } from '../../constants/colors'
const CategoryCard = ({item,onPress}) => {
  return (
    <Pressable 
       style={{alignItems:'center',justifyContent:'center'}}
       onPress={()=>onPress(item?.name)}>
        <Image
        source={item?.image}
        style={{height:wp(8),width:wp(8),borderRadius:999}}
        resizeMode='cover'
        />
        <Text allowFontScaling={false} style={{color:Colors?.black60,fontFamily:Fonts?.Regular,letterSpacing:0.8,fontSize:10}}>{item?.name?.toUpperCase()}</Text>
        </Pressable>
  )
}

export default CategoryCard

const styles = StyleSheet.create({})