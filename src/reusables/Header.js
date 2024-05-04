import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomBtn from './button'
import { useSelector } from 'react-redux'
import { Colors } from '../constants/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Fonts } from '../../asset/fonts'
import Icon, { Icons } from '../../asset/Icons/Icons'
import { Box } from 'native-base'
const Header = ({navigation,heading,dontShowCart,dontShowBack}) => {

    const CartItems = useSelector((state) => state?.cart?.items)

  return (
    <View style={styles?.header}>
      <Box flexDirection={'row'} alignItems={'center'} >
         {dontShowBack?null: <CustomBtn
            name="arrowleft"
            type={Icons.AntDesign}
            size={20}
            onPress={() => navigation.goBack()}
          />}
        {heading?  <Text style={{marginLeft:wp(2),color:Colors?.Black,fontFamily:Fonts?.Regular,fontSize:wp(4.5)}}>{heading}</Text>:null}
          </Box>
        {dontShowCart?null:  <>
          <TouchableOpacity
            onPress={() => navigation.navigate("Cart")}
            style={styles.notification}>
            <Text style={styles.notification_text}>
              {CartItems?.length}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <Icon 
            type={Icons.SimpleLineIcons}
            name='handbag'
            size={22}
            color={Colors?.Black}
            style={{marginRight:wp(4)}}
            />
          </TouchableOpacity>
          </>}
        </View>
  )
}

export default Header

const styles = StyleSheet.create({
    notification: {
        backgroundColor: Colors.Primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9999,
        height: wp(5),
        width: wp(5),
        position: 'absolute',
        zIndex: 1,
        right: wp(2),
        top: hp(2),
        paddingBottom: 1
      },
      notification_text: {
        fontSize: 14,
        fontFamily: Fonts?.Regular,
        color: Colors?.Black
      },
      header: {
        height: hp(8),
        marginBottom: hp(1),
        flexDirection: 'row',
        alignItems: 'center',
        width: wp(94),
        alignSelf: 'center',
        justifyContent: 'space-between',
      },
})