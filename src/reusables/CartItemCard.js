import { StyleSheet, Text, View,Image, TouchableOpacity, Linking } from 'react-native'
import React, { memo } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Images } from '../../asset/images'
import { Colors } from '../constants/colors'
import { Fonts } from '../../asset/fonts'
import CustomBtn from './button'
import { useDispatch,useSelector } from 'react-redux'
import { decrease_quantity, increase_quantity, remove_item } from '../slices/CartSlice'
import { Icons } from '../../asset/Icons/Icons'
import { API } from '../constants'

const CartItemCard = ({item,navigation}) => {

  const dispatch=useDispatch()
  const {UserData} = useSelector(state=>state?.UserData)
  return (
    <>
    <TouchableOpacity
    onPress={()=>navigation.navigate("Product",{id:item?.id})}
    style={styles.card}>
      <View style={styles.left_part}>
       {!item?.image?.length? <Image
          source={Images?.no_image}
          style={styles?.image}
          resizeMode='contain'
        />
        :
        <Image
        source={{uri:`${API.API_BASEURL}/assets/${item?.image[0]}`}}
        style={styles?.image}
        resizeMode='contain'/>
        }
      </View>
      <View style={styles.middle_part}>
        <Text style={styles?.title}>{item?.name}</Text>
        <Text style={styles?.price}>Condition: {item?.condition}</Text>
      </View>
      <View style={styles.right_part}>
          <CustomBtn
          name={"message1"}
          btn_style={{backgroundColor:Colors?.Primary,elevation:5, height:hp(4),width:hp(4)}}
          style={{color:Colors?.White}}
          onPress={()=>Linking.openURL(`sms:${item?.user?.phone}`)}
          // onPress={()=>item?.quantity<=1?dispatch(remove_item(item?.id)):dispatch(decrease_quantity(item?.id))}
          type={Icons.AntDesign}
          size={20}
          />
          <CustomBtn
          name={"call-outline"}
          type={Icons?.Ionicons}
          size={20}
          btn_style={{backgroundColor:Colors?.darkMagicBlue,elevation:5, height:hp(4),width:hp(4) }}
          style={{color:Colors?.White}}
          onPress={()=>Linking.openURL(`tel:${item?.user?.phone}`)}

          />
          <CustomBtn
          name={"delete"}
          type={Icons?.AntDesign}
          size={20}
          btn_style={{backgroundColor:'red',elevation:5, height:hp(4),width:hp(4) }}
          style={{color:Colors?.White}}
          onPress={()=>dispatch(remove_item(item?._id))}
          // onPress={()=>dispatch(increase_quantity(item?.id))}

          />
      </View>
    </TouchableOpacity>
      <View
      style={{backgroundColor:Colors?.LightGrey,height:1,width:wp(90),alignSelf:'center',marginVertical:hp(2)}}
      />
      </>
  )
}

export default memo(CartItemCard)

const styles = StyleSheet.create({
  card:{
    width:wp(90),
    alignSelf:'center',
    height:hp(7),
    flexDirection:'row',
    alignItems:'center',
  },
  left_part:{
    width:'20%',
    alignItems:'center',
    justifyContent:'center'
  },
  middle_part:{
    width:'45%',
    paddingHorizontal:wp(5)
  },
  right_part:{
    width:'35%',
    flexDirection:'row',
    paddingRight:wp(2),
    alignItems:'center',
    justifyContent:'space-evenly'
  },
  image:{
    width:'100%',
    height:'70%'
  },
  title:{
    color:Colors?.Black,
    fontSize:15,
    fontFamily:Fonts?.Bold,
    fontWeight:'500',
    lineHeight:19.12
  },
  price:{
    color:Colors?.Black,
    fontSize:14,
    fontFamily:Fonts?.Regular,
    fontWeight:'400',
    lineHeight:20
  },
  item_count:{
    color:Colors?.Black,
    fontSize:14,
    fontFamily:Fonts?.Regular,
    lineHeight:19.12,
    fontWeight:'500',
    marginHorizontal:wp(2)
  }
})