import { StyleSheet, View,FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, HStack, VStack,Text } from 'native-base'
import { Colors } from '../../constants/colors'
import Header from '../../reusables/Header'
import { API } from '../../constants'
import axios from 'axios'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FastImage from 'react-native-fast-image'
import { Fonts } from '../../../asset/fonts'
import Icon, { Icons } from '../../../asset/Icons/Icons'
import HostelCard from '../../components/cards/HostelCard'
import Loader from '../../reusables/Loader'
import Empty from '../../reusables/Empty'
let lastId="";
const Hostels = ({navigation}) => {
lastId=""
  const [totalHostel,setTotal]=useState(0)
  const [hostels,setHostels]=useState([])
  const [loading,setLoading]=useState(false)
  const [paging,setPaging]=useState(false)

  const _getAllHostel=(more)=>{
    if(more&&!lastId)return;
    setLoading(true)
      const params={
        url:`${API.API_BASEURL}/${API.GET_HOSTELS}`,
        data:{
          lastHostelId:more?lastId:"",
        },
        method:'POST'
      }
      axios(params)?.then(res=>{
        const {data,success,numberofHostels }=res.data;
        if(success){
          setTotal(numberofHostels)
          setHostels(prev=>[...prev,...data])
        }
      })
      .catch(e=>console.log(e))
      .finally(()=>{
        setLoading(false)
        setPaging(false)
      })
  }

  useEffect(()=>{
    _getAllHostel()
  },[])

  return (
    <Box bgColor={Colors?.White} flex={1}>
      <Header 
      navigation={navigation}
      dontShowBack={true}
      heading={`Hostels (${totalHostel})`}
      />
      <Box>
      <FlatList
      data={hostels}
      renderItem={({item,index})=>
      <HostelCard
      item={item}
      onPress={()=>navigation.navigate('HostelWiseItems',{hostel_id:item?._id,hostelName:item?.hostelName})}
      />
      }
      ListEmptyComponent={()=>loading?<Loader/>:<Empty/>}
      />
      </Box>
    </Box>
  )
}

export default Hostels

const styles = StyleSheet.create({})