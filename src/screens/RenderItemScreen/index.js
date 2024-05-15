import { StatusBar, StyleSheet, Text, View, TouchableOpacity, Pressable, ScrollView, ToastAndroid, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { API } from '../../constants'
import axios from 'axios'
import Loader from '../../reusables/Loader'
import { Colors } from '../../constants/colors'
import { useDispatch, useSelector } from 'react-redux'
import { heightPercentageToDP, heightPercentageToDP as hp, widthPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Fonts } from '../../../asset/fonts'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Carousal from '../../reusables/Carousal'
import { add_item } from '../../slices/CartSlice'
import Header from '../../reusables/Header'
import MakeFav from '../../reusables/MakeFav'
import { remove_from_favourite } from '../../slices/FavouriteSlice'
import Icon, { Icons } from '../../../asset/Icons/Icons'
const ProductDetailScreen = ({ navigation }) => {

  const CartItems = useSelector((state) => state?.cart?.items)
  const {UserData} =useSelector((state)=>state?.UserData)
  const dispatch = useDispatch()

  const favourites = useSelector(state => state?.favourites?.items)

  const route = useRoute()
  const { id } = route?.params

  const [detail, setDetail] = useState([])
  const [hostelDetail, setHostelDetail] = useState({})
  const [loading, setLoading] = useState(false)
  const [fav, setFav] = useState(false)
  useEffect(() => {
    _getProductDetail()
  }, [])

  useEffect(() => {
    let found = false;
    for (let i = 0; i < favourites.length; i++) {
      if (favourites[i]?.id === detail?.id) {
        setFav(true)
        found = true;
        break;
      }

    }
    if (!found) setFav(false)
  }, [favourites])

  const _getProductDetail = async () => {
    setLoading(true)
    // console.log(`${API.API_BASEURL}/${API.GET_PRODUCT_DETAIL}/${id}`)
  //  const res=await axios.get(`${API.API_BASEURL}/${API.GET_PRODUCT_DETAIL}/${id}`)
  //  console.log(res)

      // .then((r) => setDetail(r?.data))
      // .catch(e => console.log(e))
      const params={
        url:`${API.API_BASEURL}/${API.GET_PRODUCT_DETAIL}/${id}`,
        data:{
          hostel_id:JSON.parse(UserData?.user?.hostel)?._id
        },
        method:'GET',
        headers: {
          Authorization: `Bearer ${UserData?.token}`
        }
      }
      axios(params).then(r=>{
        setDetail(r?.data?.data)
        setHostelDetail(r?.data?.hostelData)
      }).catch(e=>console.log(e))
      .finally(() => setLoading(false))

  }
  if (!loading)
    return (
      <View style={styles?.main_screen}>
        {/* {console.log(detail)} */}
        <StatusBar
          backgroundColor={Colors.White}
        />
        <Header
          navigation={navigation}
        />
        <ScrollView
          style={{ flex: 1 }}
        >

          <View style={styles?.data_holder}>
            <Text style={styles?.title}>{detail?.name}</Text>
            <Text style={styles?.brand}>{detail?.writerName}</Text>
            <View style={styles?.review_holder}>
              <Icon
                type={Icons?.EvilIcons}
                name="location"
                color={Colors?.darkYellow}
                style={{height:24,width:24}}
                
              />
              <Text style={styles?.sub_text}>{hostelDetail?.hostelName}, </Text>
              <Text style={[styles?.sub_text, { marginLeft: wp(1), fontSize: 12 }]}>{hostelDetail?.address}</Text>
            </View>

            {/* carousal */}
            <View>
              <Carousal
                images={detail?.image}
              />
              <TouchableOpacity
                onPress={() => dispatch(remove_from_favourite(detail?._id))}
                style={{ position: 'absolute', top: hp(2), right: wp(5), }}
              >
                <MakeFav
                  favou={fav}
                  item={detail}
                  style={{ borderRadius: widthPercentageToDP(5), backgroundColor: Colors?.LightGrey, paddingHorizontal: widthPercentageToDP(4), paddingVertical: heightPercentageToDP(1.5), elevation: 5 }}
                  iconStyle={{ height: 20, width: 20 }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles?.review_holder}>
              <Text style={[styles?.sub_text, { color: Colors?.darkMagicBlue, fontFamily: Fonts?.ExtraBold, fontSize: 16 }]}>{detail?.price} Rs.</Text>
              <View style={styles?.background_sup}>
                <Text style={[styles?.sub_text, { color: Colors?.White, fontSize: 12 }]}>{detail?.category}</Text>
              </View>
            </View>
          </View>

          <View style={styles?.button_holder}>
            <TouchableOpacity onPress={() => {dispatch(add_item(detail))
            ToastAndroid.show("Item added to cart!",ToastAndroid.CENTER)
            }} style={[styles?.button, { backgroundColor: Colors?.White }]}><Text style={styles?.btn_text}>Add To Cart</Text></TouchableOpacity>
            <TouchableOpacity
            onPress={()=>(Linking.openURL(`tel:${detail?.user?.phone}`))}
            style={[styles?.button, { width: wp(45) }]}><Text style={[styles?.btn_text, { color: Colors?.White }]}>Call Now</Text></TouchableOpacity>
          </View>

          <View style={[styles?.data_holder, { flexDirection: 'row', marginBottom: hp(2),alignItems:'center' }]}>
            <Text style={[styles?.sub_text, { color: 'black', fontSize: 16, fontFamily: Fonts?.Bold }]}>Condition   </Text>
            <Text style={styles?.sub_text}>
              {detail?.condition}
            </Text>
          </View>
          <View style={[styles?.data_holder, { flexDirection: 'column', marginBottom: hp(2) }]}>
            <Text style={[styles?.sub_text, { color: 'black', fontSize: 16, fontFamily: Fonts?.Bold }]}>Details</Text>
            <Text style={styles?.sub_text}>
              {detail?.description}
            </Text>
          </View>

        </ScrollView>
      </View>
    )
  else return <Loader />
}

export default ProductDetailScreen

const styles = StyleSheet.create({
  main_screen: {
    backgroundColor: Colors?.White,
    flex: 1
  },
  title: {
    fontFamily: Fonts?.Regular,
    color: Colors.Black,
    fontSize: 50,
  },
  brand: {
    fontFamily: Fonts?.SemiBold,
    color: Colors.Black,
    fontSize: 50,
  },
  data_holder: {
    paddingHorizontal: wp(5)

  },
  review_holder: {
    flexDirection: 'row',
    marginVertical: hp(1),
    alignItems: 'center'
  },
  sub_text: {
    color: Colors?.black60,
    fontFamily: Fonts?.Regular
  },
  background_sup: {
    paddingHorizontal: wp(3),
    paddingVertical: wp(1),
    marginHorizontal: wp(2),
    backgroundColor: Colors?.Primary,
    elevation: 1,
    borderRadius: 999
  },
  button: { backgroundColor: Colors?.Primary, width: wp(40), height: hp(8), alignItems: 'center', justifyContent: 'center', borderRadius: 25, borderWidth: 1, borderColor: Colors?.Primary },
  button_holder: {
    paddingHorizontal: wp(6),
    marginVertical: hp(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  btn_text: {
    fontSize: 14,
    fontFamily: Fonts?.SemiBold,
    color: Colors?.Primary,
    letterSpacing: 0.6
  }
})