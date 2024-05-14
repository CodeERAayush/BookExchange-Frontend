import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Center, FormControl, Input } from 'native-base'
import { Colors } from '../../constants/colors'
import { Fonts } from '../../../asset/fonts'

const FormInput = ({isRequired,label,placeholder,helperText,error,onChangeText=()=>{},value,type='text',keyboardType='default'}) => {
  return (
    <Center mt={2}>
    <FormControl 
    w={['85%']}
    isRequired={isRequired}>
      <FormControl.Label _text={{
      bold: true,
      color:Colors?.Black,
    }}>{label}</FormControl.Label>
      <Input _focus={{backgroundColor:'transparent'}} type={type} focusOutlineColor={Colors?.Primary} keyboardType={keyboardType} placeholder={placeholder} value={value} onChangeText={value => onChangeText(value)} />

     { helperText?<FormControl.HelperText _text={{
      fontSize: 'xs'
    }}>
        {helperText}
      </FormControl.HelperText>:null}

      {error?<FormControl.ErrorMessage _text={{
      fontSize: 'xs'
    }}>
        {error}
      </FormControl.ErrorMessage>:null}

    </FormControl>
    </Center>
  )
}

export default FormInput

const styles = StyleSheet.create({})