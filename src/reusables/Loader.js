import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Colors } from '../constants/colors'
import { Fonts } from '../../asset/fonts'

const Loader = () => {
  return (
    <View>
      <LottieView
      source={require('../../asset/Animations/loading.json')}
      autoPlay
      loop
      style={styles?.animation}
      />
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
    animation:{
        height:hp(15),
    },
    empty_text:{
        color:Colors?.black45,
        alignSelf:'center',
        fontFamily:Fonts?.Bold,
        letterSpacing:0.8
    }
})