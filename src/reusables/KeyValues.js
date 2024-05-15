import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { Fonts } from '../../asset/fonts'
import { Colors } from '../constants/colors'

const KeyValues = ({keyy,value}) => {
  return (
    <View style={styles?.card}>
    <Text allowFontScaling={false} style={styles?.key}>{keyy}</Text>
    <Text allowFontScaling={false} style={styles?.value}>{value}</Text>
  </View>
  )
}

export default KeyValues

const styles = StyleSheet.create({
    card:{
        flexDirection:'row',
        width:widthPercentageToDP(65),
        justifyContent:'space-between',
        alignItems:'center',
        alignSelf:'center',
        marginVertical:heightPercentageToDP(0.5)
    },
    key:{
        fontSize:14,
        fontFamily:Fonts?.Regular,
        fontWeight:'400',
        color:Colors.Black
    },
    value:{
        fontSize:14,
        fontFamily:Fonts?.Bold,
        fontWeight:'500',
        color:Colors.Black
    }
})