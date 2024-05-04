import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Colors } from '../constants/colors'
import Icon, { Icons } from '../../asset/Icons/Icons'


const CustomBtn = ({name,onPress,type,size,color,style,btn_style}) => {
  return (
    <TouchableOpacity
            style={[styles?.back_btn,{...btn_style}]}
            onPress={()=>onPress()}
            >
              <Icon
              type={type}
              name={name}
              size={size||wp(3)}
              color={color||Colors?.Black}
              style={style}
              />
            </TouchableOpacity>
  )
}

export default CustomBtn

const styles = StyleSheet.create({
    back_btn:{
        marginHorizontal:wp(1),
        height:hp(5),
        width:hp(5),
        backgroundColor:Colors.LightGrey,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:9999
      },
})