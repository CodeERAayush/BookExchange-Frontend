import { Modal, StyleSheet, Text, View, TextInput, Image, FlatList, Pressable, ToastAndroid } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Box, StatusBar, Button, VStack, HStack, Center } from 'native-base';
import { Colors } from '../../constants/colors';
import { Images } from '../../../asset/images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Fonts } from '../../../asset/fonts';
import Icon, { Icons } from '../../../asset/Icons/Icons';
import { categories } from '../../helpers';
import CategoryCard from '../../components/cards/CategoryCard';
import { API } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ItemCard from '../../reusables/ItemCard';
import { add_item } from '../../slices/CartSlice';
import { debounce } from 'lodash';
import HostelSelectionModal from '../../components/modals/FilterHostelModal';
import { setHostelList } from '../../slices/HostelList';

let lastId = "";

const Search = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [hostelModalVisible, setHostelModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false); // New state for category modal
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState('');
  const [myHostel, setMyHostel] = useState(false);
  const { UserData } = useSelector(state => state.UserData);
  const [sortVisible, setSortVisible] = useState(false);
  const [sortByDate, setSortByDate] = useState(true);
  const [selectedHostelId, setHostelId] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); // New state for selected category
  const dispatch = useDispatch();
  const [HostelList, setHostels] = useState([]);

  const _getAllHostel = (more) => {
    const params = {
      url: `${API.API_BASEURL}/${API.GET_HOSTELS}`,
      data: {
        lastHostelId: more ? lastId : "",
      },
      method: 'POST'
    }
    axios(params).then(res => {
      const { data, success, numberofHostels } = res.data;
      if (success) {
        setHostels(prev => [...prev, ...data])
      }
    })
      .catch(e => console.log(e))
  }

  useEffect(() => {
    _getAllHostel()
  }, [])

  const renderitem = useCallback(({ item, index }) => (
    <ItemCard
      item={item}
      key={index}
      onPressCart={(item) => {
        dispatch(add_item(item));
        ToastAndroid.show("Item added to cart!", ToastAndroid.CENTER);
      }}
      naviagtion={navigation}
    />
  ), []);

  const getAllBooks = (more) => {
    console.log(query);
    if (lastId === -1 || (more && !lastId)) return;
    if (more) setLoading(true);
    else setRefreshing(true);
    const params = {
      url: `${API.API_BASEURL}/${API.GET_ALL_BOOKS}`,
      data: {
        searchQuery: query,
        lastBookId: more && lastId ? lastId : "",
        sortByDate: sortByDate,
        hostel_id: myHostel ? JSON.parse(UserData?.user?.hostel)?._id : selectedHostelId,
        category: selectedCategory, // Add category to the request
      },
      method: 'Post',
      headers: {
        Authorization: `Bearer ${UserData?.token}`,
      },
    };
    axios(params).then(r => {
      lastId = r?.data?.data[r?.data?.data?.length - 1]?._id;
      if (more) setData(prev => [...prev, ...r?.data?.data]);
      else setData(r?.data?.data);
    }).catch(e => console.log(e))
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    console.log(HostelList)
    getAllBooks();
  }, [myHostel, sortByDate, selectedHostelId, selectedCategory]); // Added selectedCategory to dependencies

  const debounced = debounce(getAllBooks, 500);

  useEffect(() => {
    debounced();
    return () => debounced();
  }, [query]);

  const categoryOptions = ["paper", "book", "gadgets", "clothing", "vehicle", "other"]; // Category options

  return (
    <Box flex={1} bgColor={Colors?.White}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors?.White} />
      <Pressable style={styles.search_holder}>
        <View style={styles?.search_holder_left}>
          <Image source={Images.search_icn} style={styles.searchIcon} />
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
                setSortVisible(true);
                setModalVisible(true);
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
                setSortVisible(false);
                setModalVisible(true);
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
                    setModalVisible(false);
                    setSortByDate(true);
                  }}
                >
                  Date (Newer First)
                </Button>
                <Button
                  bg={!sortByDate ? Colors?.darkMagicBlue : Colors?.White}
                  _text={{ color: !sortByDate ? Colors?.White : Colors?.Black, fontWeight: 'bold', fontSize: 'md' }}
                  borderRadius={5}
                  borderWidth={1}
                  onPress={() => {
                    setModalVisible(false);
                    setSortByDate(false);
                  }}
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
              </> : <>
                <Button
                  bg={myHostel ? Colors?.darkMagicBlue : Colors?.White}
                  _text={{ color: myHostel ? Colors?.White : Colors?.Black, fontWeight: 'bold', fontSize: 'md' }}
                  borderRadius={5}
                  borderWidth={1}
                  onPress={() => {
                    setModalVisible(false);
                    setMyHostel(prev => !prev);
                  }}
                >
                  My Hostel
                </Button>
                <Button
                  bg={ selectedHostelId ? Colors?.darkMagicBlue : Colors?.White}
                  _text={{ color: selectedHostelId ? Colors?.White : Colors?.Black, fontWeight: 'bold', fontSize: 'md' }}
                  borderRadius={5}
                  borderWidth={1}
                  onPress={() => {
                    setModalVisible(false);
                    setHostelModalVisible(true); // Open hostel selection modal
                  }}
                >
                  Choose Hostel
                </Button>
                <Button
                  bg={selectedCategory ? Colors?.darkMagicBlue : Colors?.White}
                  _text={{ color: selectedCategory ? Colors?.White : Colors?.Black, fontWeight: 'bold', fontSize: 'md' }}
                  borderRadius={5}
                  borderWidth={1}
                  onPress={() => {
                    setModalVisible(false);
                    setCategoryModalVisible(true); // Open category selection modal
                  }}
                >
                  Choose Category
                </Button>

               <HStack>
               <Button
                      onPress={() => {
                        setMyHostel(false)
                        setHostelId('')
                        setSelectedCategory('')
                        setModalVisible(false);
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

      {/* Hostel Selection Modal */}
      <HostelSelectionModal
        visible={hostelModalVisible}
        onClose={() => setHostelModalVisible(false)}
        hostels={HostelList}
        onSelect={(hostelId) => {
          setMyHostel(false)
          setHostelId(hostelId);
          setHostelModalVisible(false);
        }}
      />

      {/* Category Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={categoryModalVisible}
        onRequestClose={() => setCategoryModalVisible(false)}
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
                Select Category
              </Text>
              {categoryOptions.map((category, index) => (
                <Button
                  key={index}
                  bg={selectedCategory === category ? Colors?.darkMagicBlue : Colors?.White}
                  _text={{ color: selectedCategory === category ? Colors?.White : Colors?.Black, fontWeight: 'bold', fontSize: 'md' }}
                  borderRadius={5}
                  borderWidth={1}
                  onPress={() => {
                    setSelectedCategory(category);
                    setCategoryModalVisible(false);
                  }}
                >
                  {category}
                </Button>
              ))}
              <Button
                onPress={() => setCategoryModalVisible(false)}
                colorScheme="danger"
                borderRadius="full"
                shadow={5}
                px={6}
                py={3}
              >
                Close
              </Button>
            </VStack>
          </Box>
        </View>
      </Modal>
    </Box>
  );
};

export default Search;

const styles = StyleSheet.create({
  search_holder: {
    width: wp(95),
    height: hp(6),
    borderRadius: hp(6),
    borderWidth: 1,
    borderColor: Colors?.black45,
    marginVertical: hp(1),
    alignSelf: 'center',
    flexDirection: 'row',
  },
  search_holder_left: {
    flex: 0.2,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  search_holder_right: {
    flex: 1,
    justifyContent: 'center',
  },
  search_input: {
    width: '100%',
    height: '100%',
    fontFamily: Fonts?.Regular,
    fontSize: hp(1.8),
    color: Colors?.Black,
  },
  searchIcon: {
    width: wp(6),
    height: wp(6),
    resizeMode: 'contain',
    tintColor:Colors?.Black
  },
});
