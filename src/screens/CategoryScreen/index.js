import { StyleSheet,ToastAndroid } from 'react-native'
import React, { useCallback, useEffect,useState } from 'react'
import { Box, FlatList, StatusBar, Text } from 'native-base'
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
const Category = ({navigation}) => {
    const route=useRoute();
    const dispatch = useDispatch();
    const {UserData}=useSelector(state=>state?.UserData);
    const {category,hostel_id}=route?.params;
    const [data,setData]=useState([]);
    const [lastBookId,setLastBookId]=useState("");
    const [loading,setLoading]=useState(true)
    const _getBookCategoryWise=(more)=>{
        if(lastBookId=== -1||(more&&!lastBookId))return;
        if(more)setLoading(true)
        const params={
            url:`${API.API_BASEURL}/${API.GET_BOOKS_CATEGORYWISE}`,
            method:'Post',
            data:{
                category:category,
                lastBookId:more&&lastBookId?lastBookId:"",
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
                setData(prev=>[...prev,...data]);
                setLastBookId(data.length>0?data[data?.length-1]?._id:-1);
            }
        }).catch(e=>console.log(e))
        .finally(()=>setLoading(false))
    }
    const _getBookCategoryAndHostelWise=()=>{
        
    }

    useEffect(()=>{
        if(hostel_id) _getBookCategoryAndHostelWise()
            else _getBookCategoryWise()
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
        heading={`${category.charAt(0).toUpperCase()+category.slice(1)} Section`}
        />

        <FlatList
        data={data}
        keyExtractor={(item)=>item?._id}
        renderItem={renderItem}
        numColumns={2}
        ListEmptyComponent={()=>loading?<Loader/>:<Empty/>}
        onEndReached={()=>{
            if(hostel_id) _getBookCategoryAndHostelWise(true)
                else _getBookCategoryWise(true)
        }}
        // onEndReachedThreshold={0.5}
        ListFooterComponent={()=>lastBookId&&loading?<Box>
            <Loader/>
        </Box>:<></>}
        />
    </Box>
  )
}

export default Category

const styles = StyleSheet.create({})