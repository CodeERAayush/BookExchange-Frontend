import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'native-base'
import { Colors } from '../../constants/colors'
const UtilityBtn = ({text,onSubmit,customStyle,textStyle}) => {
  return (
    <Button 
    _pressed={{
        bgColor:Colors?.Secondary
    }}
    _text={[{color:"white",letterSpacing:'xl',fontSize:14},textStyle]}
    onPress={onSubmit} style={customStyle} rounded='xl' shadow='5' mt="5" w='85%' bgColor={Colors?.Primary}>
        {text}
      </Button>
  )
}

export default UtilityBtn

const styles = StyleSheet.create({})