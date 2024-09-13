import { StyleSheet, Text, View, StatusBar, FlatList, Image, RefreshControlComponent,ToastAndroid,Alert,Pressable } from 'react-native'
import React from 'react'
import { Box} from 'native-base'
import { Colors } from '../../constants/colors'
import { API } from '../../constants'
import { heightPercentageToDP,widthPercentageToDP,heightPercentageToDP as hp , widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Fonts } from '../../../asset/fonts'
import FastImage from 'react-native-fast-image'

const ItemRenderCard = ({item,navigation}) => {
  return (
    <Pressable
    onPress={()=>navigation.navigate("Product",{id:item?._id})}
    style={{
        flex: 1,
        backgroundColor:Colors?.White,
        borderRadius:widthPercentageToDP(2),
        justifyContent: 'center',
        elevation:5,
        overflow:'hidden'
    }}
>
  <FastImage
  source={{uri:`${API.API_BASEURL}/assets/${item?.image[0]}`}}
  style={{height:'100%',width:'100%'}}
  />
  <View style={{position:'absolute',right:widthPercentageToDP(5),top:5,opacity:0.6}}>
    <Box bgColor={Colors?.DarkGrey} paddingX={5} alignItems={'center'} justifyContent={'center'} rounded={5} >
      <Text allowFontScaling={false} style={{fontSize:24,color:Colors?.White,fontFamily:Fonts?.Medium}}>Price: {item?.price}</Text>
    </Box>
    <Box bgColor={Colors?.DarkGrey} paddingX={2} mt={0.4} alignItems={'center'} justifyContent={'center'} paddingY={2} rounded={5} >
      <Text allowFontScaling={false} style={{fontSize:16,color:Colors?.White,fontFamily:Fonts?.Medium}}>{item?.name}</Text>
    </Box>
  </View>
</Pressable>
  )
}

export default React.memo(ItemRenderCard)

const styles = StyleSheet.create({})