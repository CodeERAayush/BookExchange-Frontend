import { StyleSheet, Text, View, StatusBar, FlatList, Image, RefreshControlComponent,ToastAndroid,Alert } from 'react-native'
import React, { useCallback, useDebugValue, useEffect, useState } from 'react'
import { getAsyncJson } from '../../helpers'
import { useDispatch, useSelector } from 'react-redux'
import CustomBtn from '../../reusables/button'
import { Icons } from '../../../asset/Icons/Icons'
import Empty from '../../reusables/Empty'
import KeyValues from '../../reusables/KeyValues'
import Loader from '../../reusables/Loader'
import Header from '../../reusables/Header'
import { Box} from 'native-base'
import { Colors } from '../../constants/colors'
import HeroSection from '../../components/HeroSection'
import { API } from '../../constants'
import { measure } from 'react-native-reanimated'
import axios, { all } from 'axios'
import { addAllBookData, addLatestBookData, setAllBookData } from '../../slices/ItemsSlice'
import ItemCard from '../../reusables/ItemCard'
import Carousel from 'react-native-reanimated-carousel'
import { heightPercentageToDP,widthPercentageToDP,heightPercentageToDP as hp , widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Fonts } from '../../../asset/fonts'
import { add_item } from '../../slices/CartSlice'
import messaging from '@react-native-firebase/messaging'
import ItemRenderCard from '../../components/cards/ItemRenderCard'
const Home = ({navigation}) => {
  const {UserData} = useSelector(state=>state.UserData);
  const {allBooks,latestBooks} = useSelector(state=>state.Items)
  const dispatch = useDispatch();
  const [refreshing,setRefreshing]=useState(false)
 const getAllBooks=(more)=>{
  setRefreshing(true)
    const params={
      url:`${API.API_BASEURL}/${API.GET_ALL_BOOKS}`,
      data:{
        lastBookId:-1
      },
      method:'Post',
      headers: {
        Authorization: `Bearer ${UserData?.token}`
    }
    }
    axios(params).then(r=>{
      dispatch(setAllBookData(r?.data?.data));
    }).catch(e=>console.log(e))
    .finally(()=>setRefreshing(false))
  }

  const renderItem=useCallback((item,index)=>(<ItemRenderCard
  item={item}
  key={index}
  navigation={navigation}
  />),[allBooks])

 const getLatestBooks=()=>{
    const params={
      url:`${API.API_BASEURL}/${API.GET_LATEST_BOOKS}`,
      data:{
        hostel_id:JSON.parse(UserData?.user?.hostel)?._id
      },
      method:'Post',
      headers: {
        Authorization: `Bearer ${UserData?.token}`
    }
    }
    axios(params).then(r=>{
      dispatch(addLatestBookData(r?.data?.data));
    }).catch(e=>console.log(e))
  }

  useEffect(()=>{
    getAllBooks()
    getLatestBooks()
 
  },[])

  const renderitem=useCallback(({item})=>(<ItemCard
  item={item}
  onPressCart={(item)=>{
    dispatch(add_item(item))
    ToastAndroid.show("Item added to cart!",ToastAndroid.CENTER)
  }}
  naviagtion={navigation}
  />),[])

  return (
   <Box bgColor={Colors?.White} flex={'1'}>
    <StatusBar
    backgroundColor={Colors?.magicBlue}
    barStyle={'light-content'}
    />
    {/* {console.log(UserData?.token)} */}
    <HeroSection
    navigation={navigation}
    />
    <FlatList
    data={allBooks}
    numColumns={2}
    ListHeaderComponent={()=>
    <View>
    <Carousel
      loop
      width={widthPercentageToDP(100)}
      height={heightPercentageToDP(22)}
      style={{alignSelf:'center'}}
      autoPlay={true}
      data={latestBooks}
      scrollAnimationDuration={3000}
      mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
      renderItem={({ item,index }) => (
         renderItem(item,index)
      )}/>
      
      </View>
      }
      ListFooterComponent={()=><Box height={hp(10)}></Box>}
    renderItem={renderitem}
refreshing={refreshing}
onRefresh={getAllBooks}
    />
   </Box>
  )
}

export default Home

const styles = StyleSheet.create({
  locator: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: hp(1), position: 'absolute', bottom: hp(2), left: wp(5) },
    dark: { height: wp(1.5), width: wp(5), borderRadius: 9999, backgroundColor: Colors?.darkYellow, marginHorizontal: wp(0.5) },
    light: { height: wp(1.5), width: wp(1.5), borderRadius: 9999, backgroundColor: Colors?.black20, marginHorizontal: wp(0.5) }
})