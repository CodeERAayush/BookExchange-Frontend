
import { Box, Button, StatusBar, TextArea, VStack,Text, ScrollView , Pressable} from 'native-base'
import { StyleSheet, Image } from 'react-native'
import { Fonts } from '../../../asset/fonts'
import React, { useState } from 'react'
import { Colors } from '../../constants/colors'
import Header from '../../reusables/Header'
import FormInput from '../../components/cards/FormInput'
import { ImagePicker, launchCamera, showImagePicker, launchImageLibrary } from 'react-native-image-picker'
import { Dropdown } from 'react-native-element-dropdown'
import { useSelector } from 'react-redux'
import { API } from '../../constants'
import Loader from '../../components/cards/Loader'
import UtilityBtn from '../../components/cards/Button'
import axios from 'axios'
import { showError, showSuccess } from '../../constants/Gcconstant'
import Icon, { Icons } from '../../../asset/Icons/Icons'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import Carousel from 'react-native-reanimated-carousel'
// import Loader from '../../reusables/Loader'
const AddProduct = ({navigation}) => {

  const {UserData}=useSelector(state=>state.UserData)

  const [formData,setFormdata]=useState({
    name:'',
    publicationYear:'',
    condition:'',
    writerName:'',
    description:'',
    price:'',
    category:'',
    hostel_id:JSON.parse(UserData?.user?.hostel)?._id,
    image:null
  })

  const [loading,setLoading]=useState(false);
  const [picture,setPicture]=useState([]);
  const [modalVisible,setModalVisible]=useState(false);


  const Addproduct=()=>{
    setLoading(true);
    const data = new FormData()
    data.append(`name`, formData?.name)
    data.append(`publicationYear`,parseInt(formData?.publicationYear))
    data.append(`writerName`, formData?.writerName)
    data.append(`description`, formData?.description)
    data.append(`category`, formData?.category)
    data.append(`hostel_id`, formData?.hostel_id)
    data.append(`price`,formData?.price)
    data.append(`condition`,formData?.condition)
    picture.forEach(image=> {
      data.append(`picture`,{
        uri : image.uri,
        type: image.type,
        name: image.fileName
    })
    });
    // data.append(`picture`, picture.map((image)=>({
    //     uri : image.uri,
    //     type: image.type,
    //     name: image.fileName
    // })))
    formData?.image.forEach(name=>{

      data.append(`image`, name)
    })
    // console.log('pressed',JSON.stringify(data))
    const params = {
      url: `${API.API_BASEURL}/${API.ADD_BOOK}`,
      method: 'post',
      data: data,
      headers: {
        Authorization: `Bearer ${UserData?.token}`,
        'Content-Type' : 'multipart/form-data'
      }
    }

    // console.log(params)
    axios(params).then(res =>{
      setFormdata({
        name:'',
        publicationYear:'',
        condition:'',
        writerName:'',
        description:'',
        price:'',
        category:'',
        hostel_id:JSON.parse(UserData?.user?.hostel)?._id,
        image:null
      })
      setPicture([])
      showSuccess('SuccessFully Registered!')
      // navigation.replace("HomeScreen")
    }).catch((e) => {
      // console.log(e)
      showError("error in adding product")
    })
    .finally(()=>setLoading(false))
  }

  const selectFile = () => {

    var options = {

      title: 'Select Image',
      selectionLimit:5,
      customButtons: [

        {

          name: 'customOptionKey',

          title: 'Choose file from Custom Option'

        },

      ],

      storageOptions: {

        skipBackup: true,

        path: 'images',

      },

    };

    launchImageLibrary(options, res => {

      // console.log('Response = ', res);

      if (res.didCancel) {

        // console.log('User cancelled image picker');
      } else if (res.error) {

        // console.log('ImagePicker Error: ', res.error);

      } else if (res.customButton) {

        // console.log('User tapped custom button: ', res.customButton);

        Alert.alert(res.customButton);

      } else {

        let source = res;
        // console.log(source.assets)
        setFormdata({...formData,image:source.assets?.map((item)=>item?.fileName)})
        setPicture(source.assets);
        
      }

    });

  };


  return (
   <Box flex={1} bgColor={Colors?.White}>
   
    <Header
    heading={'Add Item'}
    dontShowBack={true}
    navigation={navigation}
    />

{/* <Button
onPress={()=>selectFile()}
/> */}
  <Pressable
        onPress={()=>selectFile()}
        h='20%' w={'90%'} alignItems={'center'} justifyContent={'center'} alignSelf={'center'} rounded={'2xl'} borderWidth='1' borderColor={'gray.300'} >
          {picture?.length>0?
          <Carousel
          loop
          width={widthPercentageToDP(90)}
          height={'20%'}
          style={{alignSelf:'center'}}
          autoPlay={true}
          data={picture}
          scrollAnimationDuration={3000}
          renderItem={({item,index})=><Image
          key={index}
          source={{uri:item?.uri}}
            resizeMode='contain'
            style={{width:"100%", height:'100%', borderRadius:10}}
          />}
          />
          :<><Icon
            type={Icons?.FontAwesome}
            name={'picture-o'}
            size={35}
            color={Colors?.LightGrey}
          />
          <Text allowFontScaling={false} mt={1} color={'gray.300'}>Select Profile Image</Text></>}
        </Pressable>
    <ScrollView>
      <FormInput
      isRequired={true}
      label={'Item Name'}
      placeholder={'Enter Item Name'}
      helperText={'Eg. Maths Book, Hero Cycle etc...'}
      onChangeText={(text)=>setFormdata({...formData,name:text})}
      value={formData?.name}
      />
      <Box w={'85%'} mt={1} alignSelf={'center'}>
      <Text allowFontScaling={false} style={styles?.label}>Select Category <Text allowFontScaling={false} style={{color:'red'}}>*</Text></Text>
      </Box>
      <Dropdown
  style={styles.dropdown}
  placeholderStyle={styles.placeholderStyle}
  selectedTextStyle={styles.selectedTextStyle}
  inputSearchStyle={styles.inputSearchStyle}
  iconStyle={styles.iconStyle}
  itemTextStyle={{
color:Colors?.Black
  }}
  // 'paper', 'book', 'gadgets', 'clothing', 'vehicle', 'other'
  data={[
    {label:'Question Paper',value:'paper'},
    {label:'Book',value:'book'},
    {label:'Gadgets',value:'gadgets'},
    {label:'Clothing and Lifestyle',value:'clothing'},
    {label:'Vehicle',value:'vehicle'},
    {label:'Others',value:'other'},
  ]}
  search
  maxHeight={300}
  labelField="label"
  valueField="value"
  placeholder="Select Category"
  searchPlaceholder="Search..."
  value={formData?.category}
  onChange={item => {
    // setValue(item.value);
    setFormdata({...formData, category: item.value})

  }}
/>
      <FormInput
      isRequired={true}
      label={'Condition Of Product'}
      placeholder={'Enter The Condition '}
      helperText={'Eg. Good, Fair, Superb etc...'}
      onChangeText={(text)=>setFormdata({...formData,condition:text})}
      value={formData?.condition}
      />
      <FormInput
      isRequired={true}
      label={'Year/Publication'}
      placeholder={'Enter Item\'s Purchase Year or Publication Year'}
      keyboardType='numeric'
      helperText={'Eg. Publication year (if book) etc...'}
      onChangeText={(text)=>setFormdata({...formData,publicationYear:text})}
      value={formData?.publicationYear}
      />
      <FormInput
      isRequired={true}
      label={'Company Name'}
      placeholder={'Enter Item Name'}
      helperText={'Eg. Maths Book, Hero Cycle etc...'}
      onChangeText={(text)=>setFormdata({...formData,writerName:text})}
      value={formData?.writerName}
      />
      <FormInput
      isRequired={true}
      label={'Price'}
      placeholder={'Enter Item Price'}
      keyboardType='numeric'
      // helperText={'Eg. Maths Book, Hero Cycle etc...'}
      onChangeText={(text)=>setFormdata({...formData,price:text})}
      value={formData?.price}
      />

<Box w={'85%'} alignSelf={'center'}>
            <Text allowFontScaling={false} style={styles?.label}>Product Description<Text allowFontScaling={false} style={{color:'red'}}>*</Text></Text>
            </Box>
          <TextArea
          value={formData?.description}
            onChangeText={(value) => setFormdata({ ...formData, description: value })}
            h={20} placeholder="Enter Your Address" w="85%" alignSelf={'center'} mt={1}/>
             <UtilityBtn
          text={'Submit'}
          onSubmit={() => Addproduct()}
          customStyle={{ alignSelf: 'center' }}
        />
        <Box
        mb={heightPercentageToDP(20)}
        />
    </ScrollView>
<Loader
loading={loading}
/>
   </Box>
  )
}

export default AddProduct
const styles = StyleSheet.create({
  bottomDesign: {
    // backgroundColor: Colors.Primary,
    position: 'absolute',
    height: "40%",
    width: '90%',
    alignSelf: 'center',
    bottom: 0,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    opacity: 0.1
  },
  Image_Holder: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: Colors.LightGrey,
    padding: 20,
    borderRadius: 9999,
    width: 100,
    height: 100,
    marginBottom: 10,
    overflow: 'hidden'
  },
  label_text: {
    fontSize: 12,
    color: 'blue',
    fontFamily: Fonts.Regular,
    marginLeft: 40,
    
  },
  label:{
    fontSize: 14,
    fontWeight:'bold',
    color: Colors.Black,
    fontFamily: Fonts.Regular,
    marginTop: 10,
  },
  form: {
    flex: 1,
    paddingTop: 10,
    zIndex: 10
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: Colors.DarkGrey,
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    color: Colors.Black,
    fontSize: 14,
    borderRadius: 10,
    fontFamily: Fonts.MontRegular,
    alignSelf: 'center',
    marginBottom: 10,
  },
  button: {
    width: '80%',
    padding: 10,
    backgroundColor: Colors.Secondary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 10,
    marginBottom: 50,
    elevation: 2
  },
  buttonText: {
    color: Colors.White,
    letterSpacing: 1,
    fontFamily: Fonts.NunitoBold,
    fontSize: 18,

  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: Colors.Black,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: Fonts.MontSemiBold,
    marginVertical: 10
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  dropdown: {
    marginBottom: 16,
    marginTop:5,
    height: 50,
    width:'85%',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    backgroundColor:'white',
    elevation:5,
    paddingHorizontal:8,
    alignSelf:'center',
    borderRadius:5
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color:Colors?.Black
  },
  selectedTextStyle: {
    fontSize: 16,
    color:Colors?.Black

  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color:Colors?.Black
  },
})