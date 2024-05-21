import { StyleSheet,ToastAndroid,View,FlatList } from 'react-native'
import React, { useCallback, useEffect,useState } from 'react'
import { Box, HStack, StatusBar, Text} from 'native-base'
import { useRoute } from '@react-navigation/native'
import { API } from '../../constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../reusables/Header'
import { Colors } from '../../constants/colors'
import ItemCard from '../../reusables/ItemCard'
import { add_item } from '../../slices/CartSlice'
import Empty from '../../reusables/Empty'
import Loader from '../../reusables/Loader'
import CategoryCard from '../../components/cards/CategoryCard'
import { categories } from '../../helpers'
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from 'react-native-responsive-screen'
let lastId="";
const HostelWiseItems = ({navigation}) => {
    const route=useRoute();
    const dispatch = useDispatch();
    const {UserData}=useSelector(state=>state?.UserData);
    const {hostel_id,hostelName}=route?.params;
    const [data,setData]=useState([]);
    const [lastBookId,setLastBookId]=useState("");
    const [loading,setLoading]=useState(true)
    const _getBookCategoryWise=(more)=>{
        if(!more&&lastId==-1) lastId="";
        if(lastId==-1||more&&!lastId)return;
        if(more)setLoading(true)
        const params={
            url:`${API.API_BASEURL}/${API.GET_BOOKS_HOSTELWISE}`,
            method:'Post',
            data:{
                hostel_id:hostel_id,
                lastBookId:more&&lastId?lastId:"",
            },
            headers: {
                Authorization: `Bearer ${UserData?.token}`
            }
        }
        // console.log(params)
        axios(params).then(res=>{
            const {data,success}=res.data;
            if(success){
                // console.log(data)
                // setLastBookId(data.length>0?data[data?.length-1]?._id:-1);
                lastId=data.length>0?data[data?.length-1]?._id:-1;
                setData(prev=>[...prev,...data]);
            }
        }).catch(e=>console.log(e))
        .finally(()=>setLoading(false))
    }


    useEffect(()=>{
        // if(hostel_id) _getBookCategoryAndHostelWise()
           _getBookCategoryWise()
    },[])

    const renderItem=useCallback(({item})=>{
        return(<ItemCard
            item={item}
            onPressCart={(item)=>{
              dispatch(add_item(item))
              ToastAndroid.show("Item added to cart!",ToastAndroid.CENTER)
            }}
            naviagtion={navigation}
            />)
    },[])

  return (
    <Box flex={1} bgColor={Colors?.White}>
        {/* {console.log(lastBookId)} */}
        <StatusBar
        backgroundColor={Colors?.White}
        barStyle={'dark-content'}
        />
        <Header
        navigation={navigation}
        heading={`Products in ${hostelName.charAt(0).toUpperCase()+hostelName.slice(1)}`}
        />
<Box></Box>
        <FlatList
        data={data}
        keyExtractor={(item)=>item?._id}
        renderItem={renderItem}
        numColumns={2}
        ListHeaderComponent={()=>(
<HStack width={wp(95)} h={hp(5)} justifyContent={'space-evenly'} my={5} alignSelf={'center'}>
       {categories.map((item,index)=>(<CategoryCard
       item={item}
      key={index}
       onPress={(name)=>navigation.navigate('Category',{category:name,hostel_id:hostel_id})}
       />))}
      </HStack>
        )}
        ListEmptyComponent={()=>loading?<Loader/>:<Empty/>}
        onEndReached={()=>{
                _getBookCategoryWise(true)
        }}
        // onEndReachedThreshold={0.2}
        ListFooterComponent={()=>lastBookId&&loading?<Box h={10}>
            <Loader/>
        </Box>:<></>}
        />
    </Box>
  )
}

export default HostelWiseItems

const styles = StyleSheet.create({})