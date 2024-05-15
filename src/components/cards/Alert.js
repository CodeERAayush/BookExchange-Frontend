import {Alert,Center,VStack,HStack,Text,IconButton,Box,} from 'native-base'
import { StyleSheet} from 'react-native'
import React from 'react'
import Icon, { Icons } from '../../../asset/Icons/Icons';

const ShowAlert = ({type,heading,content,closeAlert=()=>{}}) => {
  return (
    <Center>
    <Alert width={'95%'} status={type}>
      <VStack space={2} flexShrink={1} w="100%">
        <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
          <HStack flexShrink={1} space={2} alignItems="center">
            <Alert.Icon />
            <Text allowFontScaling={false} fontSize="md" fontWeight="medium" color="coolGray.800">
              {heading}
            </Text>
          </HStack>
          <IconButton 
          onPress={closeAlert}
          variant="unstyled" _focus={{
          borderWidth: 0
        }} icon={<Icon
        type={Icons?.Entypo}
        name='cross'
        size={24}
        />} />
        </HStack>
       {content? <Box pl="6" _text={{
        color: "coolGray.600"
      }}>
          {content}
        </Box>:null}
      </VStack>
    </Alert>
  </Center>
  )
}

export default ShowAlert

const styles = StyleSheet.create({})