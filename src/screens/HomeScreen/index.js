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
import axios from 'axios'
import { addAllBookData, addLatestBookData, setAllBookData } from '../../slices/ItemsSlice'
import ItemCard from '../../reusables/ItemCard'
import Carousel from 'react-native-reanimated-carousel'
import { heightPercentageToDP,widthPercentageToDP,heightPercentageToDP as hp , widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Fonts } from '../../../asset/fonts'
import { add_item } from '../../slices/CartSlice'
import messaging from '@react-native-firebase/messaging'
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
          <View
              style={{
                  flex: 1,
                  // borderWidth: 1,
                  backgroundColor:Colors?.White,
                  borderRadius:widthPercentageToDP(2),
                  justifyContent: 'center',
                  elevation:5,
                  overflow:'hidden'
              }}
          >
            <Image
            // item?.image[0]
            source={{uri:`${API.API_BASEURL}/assets/${item?.image[0]}`}}
            style={{height:'100%',width:'100%'}}
            />
            <View style={{position:'absolute',right:widthPercentageToDP(5),top:5,opacity:0.6}}>
              <Box bgColor={Colors?.DarkGrey} paddingX={5} alignItems={'center'} justifyContent={'center'} rounded={5} >
                <Text style={{fontSize:24,color:Colors?.White,fontFamily:Fonts?.Medium}}>{item?.name}</Text>
              </Box>
              <Box bgColor={Colors?.DarkGrey} paddingX={2} mt={0.4} alignItems={'center'} justifyContent={'center'} paddingY={2} rounded={5} >
                <Text style={{fontSize:16,color:Colors?.White,fontFamily:Fonts?.Medium}}>Condition: {item?.condition}</Text>
              </Box>
            </View>
          </View>
          
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