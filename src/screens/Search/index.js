import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Box, StatusBar } from 'native-base'
import { Colors } from '../../constants/colors'

const Search = () => {
  return (
    <Box flex={1} bgColor={Colors?.White}>
        <StatusBar barStyle={'dark-content'} backgroundColor={Colors?.White}/>
      <Text>Search</Text>
    </Box>
  )
}

export default Search

const styles = StyleSheet.create({})