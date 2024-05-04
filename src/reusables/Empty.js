import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Colors } from '../constants/colors'
import { Fonts } from '../../asset/fonts'

const Empty = () => {
  return (
    <View>
      <LottieView
      source={require('../../asset/Animations/emptyCart.json')}
      autoPlay
      loop
      style={styles?.animation}
      />
      <Text style={styles.empty_text}>
        No Items Found
      </Text>
    </View>
  )
}

export default Empty

const styles = StyleSheet.create({
    animation:{
        height:hp(25),
    },
    empty_text:{
        color:Colors?.black45,
        alignSelf:'center',
        fontFamily:Fonts?.Bold,
        letterSpacing:0.8
    }
})