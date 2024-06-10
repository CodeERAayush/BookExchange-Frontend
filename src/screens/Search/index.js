import { Modal, StyleSheet, Text, View, TextInput, Image, FlatList, Pressable, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Box, StatusBar, Button, VStack, HStack, Center } from 'native-base'
import { Colors } from '../../constants/colors'
import { Images } from '../../../asset/images'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Fonts } from '../../../asset/fonts'
import Icon, { Icons } from '../../../asset/Icons/Icons'
import { categories } from '../../helpers'
import CategoryCard from '../../components/cards/CategoryCard'
import { API } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import ItemCard from '../../reusables/ItemCard'
import { add_item } from '../../slices/CartSlice'
let lastId = "";
const Search = ({ navigation }) => {

  const HostelList=useSelector(state=>state.Hostel?.HostelList)

  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false)
  const [query, setQuery] = useState('')
  const [myHostel, setMyHostel] = useState(false)
  const { UserData } = useSelector(state => state.UserData);
  const [sortVisible, setSortVisible] = useState(false);
  const [sortByDate, setSortByDate] = useState(true)
  const [selectedHostelId,setHostelId]=useState('')
  const dispatch = useDispatch()
  const renderitem = useCallback(({ item, index }) => (<ItemCard
    item={item}
    key={index}
    onPressCart={(item) => {
      dispatch(add_item(item))
      ToastAndroid.show("Item added to cart!", ToastAndroid.CENTER)
    }}
    naviagtion={navigation}
  />), [])

  const getAllBooks = (more) => {
    if (lastId === -1 || (more && !lastId)) return;
    if (more) setLoading(true)
    else setRefreshing(true)
    const params = {
      url: `${API.API_BASEURL}/${API.GET_ALL_BOOKS}`,
      data: {
        searchQuery: query,
        lastBookId: more && lastId ? lastId : "",
        sortByDate: sortByDate,
        hostel_id:myHostel?JSON.parse(UserData?.user?.hostel)?._id:selectedHostelId,
      },
      method: 'Post',
      headers: {
        Authorization: `Bearer ${UserData?.token}`
      }
    }
    axios(params).then(r => {
      lastId = r?.data?.data[r?.data?.data?.length - 1]?._id;

      if (more) setData(prev => [...prev, ...r?.data?.data])
      else
        setData(r?.data?.data);


    }).catch(e => console.log(e))
      .finally(() => {
        setLoading(false)
        setRefreshing(false)
      })
  }

  useEffect(() => {
    getAllBooks()
  }, [query, myHostel, sortByDate])

  return (
    <Box flex={1} bgColor={Colors?.White}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors?.White} />
      <Pressable

        style={styles.search_holder}>
        <View style={styles?.search_holder_left}>
          <Image
            source={Images.search_icn}
            style={styles.searchIcon}
          />
        </View>
        <View style={styles?.search_holder_right}>
          <TextInput
            style={styles.search_input}
            placeholder='Search Item...'
            placeholderTextColor={Colors?.black45}
            value={query}
            onChangeText={(text) => setQuery(text)}
          />
        </View>
      </Pressable>

      <FlatList
        data={data}
        ListHeaderComponent={() => <>
          <HStack space={4} alignItems="center" mx={3} my={1} justifyContent={'center'}>
            <Button
              onPress={() => {
                setSortVisible(true)
                setModalVisible(true)
              }}
              bg={Colors?.White}
              _text={{ color: 'black', fontSize: 'md', fontFamily: Fonts?.Regular }}
              flex={1}
              borderWidth={1}
              leftIcon={<Icon type={Icons?.FontAwesome} name="sort" size={24} color={Colors.Black} />}
            >
              Sort
            </Button>
            <Button
              onPress={() => {
                setSortVisible(false)
                setModalVisible(true)
              }}
              bg={Colors?.White}
              _text={{ color: 'black', fontSize: 'md', fontFamily: Fonts?.Regular }}
              flex={1}
              borderWidth={1}
              leftIcon={<Icon type={Icons?.FontAwesome} name="filter" size={24} color={Colors.Black} />}
            >
              Filter
            </Button>
          </HStack>

          <HStack width={wp(95)} h={hp(5)} justifyContent={'space-evenly'} my={5} alignSelf={'center'}>
            {categories.map((item, index) => (<CategoryCard
              item={item}
              key={index}
              onPress={(name) => navigation.navigate('Category', { category: name })}
            />))}
          </HStack>
        </>}
        renderItem={({ item, index }) => renderitem({ item, index })}
        numColumns={2}
        refreshing={refreshing}
        onEndReachedThreshold={0.2}
        onEndReached={() => getAllBooks(true)}
        onRefresh={getAllBooks}

      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <Box
            bg="white"
            p={4}
            borderTopRadius={20}
            shadow={2}
            width="100%"
            alignSelf="center"
          >
            <VStack space={4}>
              <Text style={{ fontFamily: Fonts?.Bold, fontSize: 18, color: Colors?.Black }}>
                {sortVisible ? 'Sort by' : 'Filter by'}
              </Text>
              {sortVisible ? <>
                <Button
                  bg={sortByDate ? Colors?.darkMagicBlue : Colors?.White}
                  _text={{ color: sortByDate ? Colors?.White : Colors?.Black, fontWeight: 'bold', fontSize: 'md' }}
                  borderRadius={5}
                  borderWidth={1}

                  onPress={() => {
                    setModalVisible(false)
                    setSortByDate(true)}}
                >
                  Date (Newer First)
                </Button>
                <Button
                  bg={!sortByDate ? Colors?.darkMagicBlue : Colors?.White}
                  _text={{ color: !sortByDate ? Colors?.White : Colors?.Black, fontWeight: 'bold', fontSize: 'md' }}
                  borderRadius={5}
                  borderWidth={1}
                  onPress={() => {
                    setModalVisible(false)
                    setSortByDate(false)}}

                >
                  Date (Older First)
                </Button>

                <Button
                  onPress={() => setModalVisible(false)}
                  colorScheme="danger"
                  borderRadius="full"
                  shadow={5}
                  px={6}
                  py={3}
                >
                  Close
                </Button>
              </> :
                <>
                  <Button
                    bg={myHostel?Colors?.darkMagicBlue:Colors?.White}
                    _text={{ color: myHostel?Colors?.White:Colors?.Black, fontWeight: 'bold', fontSize: 'md' }}
                    borderRadius={5}
                    borderWidth={1}
                    onPress={() => setMyHostel(prev=>!prev)}
                  >
                    My Hostel
                  </Button>
                  <Button
                    bg={Colors?.White}
                    _text={{ color: Colors?.Black, fontWeight: 'bold', fontSize: 'md' }}
                    borderRadius={5}
                    borderWidth={1}
                    onPress={() => { /* Your sort logic here */ }}
                  >
                    Select Other Hostel
                  </Button>
                  <Button
                    bg={Colors?.White}
                    _text={{ color: Colors?.Black, fontWeight: 'bold', fontSize: 'md' }}
                    borderRadius={5}
                    borderWidth={1}
                    onPress={() => { /* Your sort logic here */ }}
                  >
                    Category
                  </Button>
                  <HStack>
                    <Button
                      onPress={() => {
                        setMyHostel(false)
                      }}
                      colorScheme="cyan"
                      shadow={5}
                      borderRadius="full"
                      flex={1}
                    >
                      Clear Filters
                    </Button>
                    <Box mx={1}></Box>
                    <Button
                      onPress={() => setModalVisible(false)}
                      colorScheme="danger"
                      shadow={5}
                      borderRadius="full"
                      flex={1}
                    >
                      Close
                    </Button>
                  </HStack>
                </>}
            </VStack>
          </Box>
        </View>
      </Modal>
    </Box>
  )
}

export default Search

const styles = StyleSheet.create({
  search_holder_right: {
    width: '85%',
    justifyContent: 'center',
    marginLeft: wp(1)
  },
  search_holder: {
    backgroundColor: Colors.darkMagicBlue,
    // height:hp(),
    width: wp(95),
    alignSelf: 'center',
    padding: 0,
    marginTop: hp(1),
    borderRadius: wp(2),
    flexDirection: 'row'
  },
  search_holder_left: {
    width: '10%',
    // height: hp(7),
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  search_input: {
    fontFamily: Fonts.Regular,
    fontWeight: '500',
    color: Colors?.White
  },
  searchIcon: {
    height: hp(1.5),
    width: hp(1.5),
    marginRight: wp(1)
  },
})