import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Colors } from '../../constants/colors'
import CartItemCard from '../../reusables/CartItemCard'
import Empty from '../../reusables/Empty'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Fonts } from '../../../asset/fonts'
import CustomBtn from '../../reusables/button'
import KeyValues from '../../reusables/KeyValues'
import Header from '../../reusables/Header'
const Cart = ({navigation}) => {

  const CartItems=useSelector((state)=>state?.cart?.items)

  // const [price,setPrice]=useState(0)

  // useEffect(()=>{
  //   let price=0;
  //   for (let item of CartItems){
  //       price+=parseInt(item?.price)*parseInt(item?.quantity)
  //   }
  //   setPrice(price)
  // },[CartItems])


  const renderItem = useCallback(({item,index}) => (
    <CartItemCard
    item={item}
    navigation={navigation}
    />
  ), []);

  return (
    <View style={styles?.main_screen}>
        <StatusBar backgroundColor={Colors?.White}/>
        {/* Shopping Cart ({CartItems.length}) */}
      <Header
      navigation={navigation}
      heading={`Shopping Cart (${CartItems.length})`}
      dontShowCart={true}
      />
    <FlatList
    data={CartItems}
    keyExtractor={(item,index)=>index.toString()}
    renderItem={renderItem}
    ListEmptyComponent={()=><Empty/>}
    />
    {/* <View style={styles.bottom_area}>
        <KeyValues
        keyy={"Subtotal"}
        value={`Rs. ${price}`}
        />
       {CartItems.length?  <KeyValues
        keyy={"Delivery"}
        value={"Rs. 2.00"}
        />
      :
      <KeyValues
      keyy={"Delivery"}
      value={"Rs. 0.00"}
      />
      }
       {CartItems.length?<KeyValues
        keyy={"Total"}
        value={`Rs. ${price+2}`}
        />
        :
        <KeyValues
        keyy={"Total"}
        value={`Rs. ${price}`}
        />}
        <TouchableOpacity 
        disabled={!CartItems?.length}
        style={[styles?.checkout_btn,{backgroundColor:CartItems?.length?Colors?.Secondary:Colors?.Primary}]}>
          <Text style={styles?.checkout_text}>Proceed To Checkout</Text>
        </TouchableOpacity>
    </View> */}
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  main_screen:{
    flex:1,
    backgroundColor:Colors?.White
  },
  header:{
    height:hp(8),
    marginBottom:hp(1),
    flexDirection:'row',
    alignItems:'center',
    width:wp(94),
    alignSelf:'center'
  },
  back_btn:{
    marginHorizontal:wp(5),
    height:hp(5),
    width:hp(5),
    backgroundColor:Colors.LightGrey,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:9999
  },
  heading:{
    fontFamily:Fonts?.Medium,
    fontSize:16,
    color:Colors?.Black,
    marginLeft:wp(4)
  },
  bottom_area:{
    height:hp(28),
    backgroundColor:Colors?.LightGrey,
    borderRadius:wp(10),
    width:wp(94),
    alignSelf:'center',
    paddingVertical:hp(2)
  },
  checkout_btn:{
    width:wp(75),
    backgroundColor:Colors?.Primary,
    height:hp(7.5),
    alignSelf:'center',
    marginTop:hp(3),
    borderRadius:wp(5),
    alignItems:'center',
    justifyContent:'center'
  },
  checkout_text:{
    fontFamily:Fonts?.Bold,
    fontWeight:'600',
    color:Colors?.White,
    letterSpacing:0.6
  }
})