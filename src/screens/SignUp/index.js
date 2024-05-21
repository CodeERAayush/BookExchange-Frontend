import { StyleSheet, View, SafeAreaView,ScrollView, PermissionsAndroid, Alert,Modal, Image,KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Pressable, StatusBar, Text, TextArea, VStack } from 'native-base'
import { Colors } from '../../constants/colors'
import FormInput from '../../components/cards/FormInput'
// import Button from '../../components/cards/Button'
import UtilityBtn from '../../components/cards/Button'
import { API } from '../../constants'
import axios from 'axios'
import { Fonts } from '../../../asset/fonts'
import Icon, { Icons } from '../../../asset/Icons/Icons'
import { ImagePicker, launchCamera, showImagePicker, launchImageLibrary } from 'react-native-image-picker'
import Loader from '../../components/cards/Loader'
import ShowAlert from '../../components/cards/Alert'
import { showError, showSuccess } from '../../constants/Gcconstant'
import { showMessage } from 'react-native-flash-message'
import {useDispatch,useSelector} from 'react-redux'
import { setHostelList } from '../../slices/HostelList'
import { Dropdown } from 'react-native-element-dropdown';
import Header from '../../reusables/Header'
import messaging from '@react-native-firebase/messaging'
const SignUp = ({navigation}) => {

  const dispatch=useDispatch()
  const HostelList=useSelector(state=>state.Hostel?.HostelList)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    cnfPass: '',
    firstName: '',
    lastName: '',
    picturePath: '',
    hostel:'',
    address: '',
    phone:0,
  })
  const [NotificationId,setNotificationid]=useState('')
  const [loading,setLoading]=useState(false);
  const [image,setImage]=useState(null);
  const [modalVisible,setModalVisible]=useState(false);
  const [alert,setAlert]=useState(null)
  const [showAlert,setShowAlert]=useState(false)
  const [value,setValue]=useState(null)
  // const [data,setData]=useState([])
  const validate = () => {

  }
  // ["picture", "{\"originalPath\":\"/sdcard/.transforms/synthetic/picker/0/com.android.providers.media.photopicker/media/1000028985.jpg\",\"type\":\"image/jpeg\",\"height\":2867,\"width\":2867,\"fileName\":\"1000028985.jpg\",\"fileSize\":1687402,\"uri\":\"file:///data/user/0/com.bookexchange/cache/rn_image_picker_lib_temp_44108f4f-a63d-469c-bacc-ce0831f595f4.jpg\"}"], ["picturePath", "1000028985.jpg"]

  const signUp = () => {
    setLoading(true);
    const data = new FormData()
    data.append(`firstName`, formData?.firstName)
    data.append(`lastName`, formData?.lastName)
    data.append(`email`, formData?.email)
    data.append(`password`, formData?.password)
    data.append(`address`, formData?.address)
    data.append(`hostel`, formData?.hostel)
    data.append(`phone`,formData?.phone)
    data.append(`picture`, {
        uri : image.uri,
        type: image.type,
        name: image.fileName
    })
    data.append(`picturePath`, formData?.picturePath)
    data.append(`NotificationId`, NotificationId)
    const params = {
      url: `${API.API_BASEURL}/${API.REGISTER}`,
      method: 'post',
      data: data,
      headers: {
   
        'Content-Type' : 'multipart/form-data'
      }
    }
    axios(params).then(res =>{
      showSuccess('SuccessFully Registered!')
      navigation.replace("Login")
    }).catch((e) => {
      showError("error in registration")
    })
    .finally(()=>setLoading(false))
  }

  useEffect(()=>{
    callHostelList()
    getDeviceToken()
  },[])


  const getDeviceToken=async ()=>{
   const granted=await PermissionsAndroid.request((PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS),{
      title: "App Notification Permission",
          message: "App needs access to access your notifications ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        })
        // console.log(granted)
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const token = await messaging().getToken();
      setNotificationid(token)
    } else {
      // User decline
    }
  }

  const callHostelList=()=>{
    setLoading(true)
    const params={
      url:`${API?.API_BASEURL}/${API?.HOSTEL_LIST}`,
      method:'get'
    }
    axios(params).then(response=>dispatch(setHostelList(response?.data?.data)))
               .catch(err=>console.log('err: ',err))
               .finally(()=>setLoading(false))
  }



  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message: "App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log("Camera permission given");
        cameraLaunch();
      } else {
        // console.log("Camera permission denied");
      }
    } catch (err) {
      // console.warn(err);
    }
  };


  const cameraLaunch = () => {

    let options = {

      storageOptions: {

        skipBackup: true,

        path: 'images',

      },

    };

    launchCamera(options, (res) => {

      if (res.didCancel) {

        // console.log('User cancelled image picker');

      } else if (res.error) {

        // console.log('ImagePicker Error: ', res.error);

      } else if (res.customButton) {

        // console.log('User tapped custom button: ', res.customButton);

        Alert.alert(res.customButton);

      } else {
        let source = res;
        setFormData({...formData,picturePath:source.assets[0]?.fileName})
        setImage(source.assets[0]);
        // type == "Profile" ? setProfileImage(source.assets[0].uri) : setId(source.assets[0].uri)
      }

    });

  }

  const selectFile = () => {

    var options = {

      title: 'Select Image',
      // selectionLimit:5,
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
        // console.log(source.assets[0])
        setFormData({...formData,picturePath:source.assets[0]?.fileName})
        setImage(source.assets[0]);
        
      }

    });

  };



  return (
    <SafeAreaView backgroundColor={Colors?.White} flex={1}>
      <StatusBar
        backgroundColor={Colors?.White}
        barStyle={'dark-content'}
      />
<Header
dontShowCart={true}
navigation={navigation}/>
      {/* {console.log('hostel lsit: ',HostelList)} */}
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{backgroundColor:'white',flex:1}}>
      <Box mx='5%' >
        <Text allowFontScaling={false} fontSize={{
          base: "50px",
          md: "60px",
          lg: "70px"
        }}
          // bold
          fontFamily={Fonts.Regular}
          color={Colors.Black} letterSpacing='2xl'>GRABit</Text>
        <Text allowFontScaling={false} fontSize={{
          base: "20px",
          md: "60px",
          lg: "70px"
        }}
          // bold
          fontFamily={Fonts.Regular}
          mb={5}
          color={Colors.Black} letterSpacing='2xl'> Signup</Text>

      </Box>
      <ScrollView
        // flex={1}
        // style={{backgroundColor:'red'}}
        contentContainerStyle={{
          paddingBottom:'40%'         
        }}
      >
        <Pressable 
        onPress={()=>setModalVisible(true)}
        h='20%' w={'90%'} alignItems={'center'} justifyContent={'center'} alignSelf={'center'} rounded={'2xl'} borderWidth='1' borderColor={'gray.300'} >
          {image?.uri?<Image
          source={{uri:image?.uri}}
            resizeMode='contain'
            style={{width:"100%", height:'100%', borderRadius:10}}
          />:<><Icon
            type={Icons?.FontAwesome}
            name={'picture-o'}
            size={35}
            color={Colors?.LightGrey}
          />
          <Text allowFontScaling={false} mt={1} color={'gray.300'}>Select Profile Image</Text></>}
        </Pressable>

        <FormInput
          isRequired={true}
          label={'First Name'}
          placeholder={'Enter Your First Name'}
          onChangeText={(value) => setFormData({ ...formData, firstName: value })}
          value={formData.firstName}
        />
        <FormInput
          isRequired={true}
          label={'Last Name'}
          placeholder={'Enter Your Last Name'}
          onChangeText={(value) => setFormData({ ...formData, lastName: value })}
          value={formData.lastName}
        />
        <FormInput
          isRequired={true}
          label={'Phone Number'}
          placeholder={'Enter Your Phone Number'}
          type='number'
          onChangeText={(value) => setFormData({ ...formData,  phone: value })}
          value={formData.phone}
        />
        <Box w={'85%'} alignSelf={'center'}>
            <Text allowFontScaling={false} style={styles?.label}>Address <Text allowFontScaling={false} style={{color:'red'}}>*</Text></Text>
            </Box>
          <TextArea
          value={formData?.address}
            onChangeText={(value) => setFormData({ ...formData, address: value })}
            h={20} placeholder="Enter Your Address" w="85%" alignSelf={'center'} mt={1}/>
            <Box w={'85%'} alignSelf={'center'}>
            <Text allowFontScaling={false} style={styles?.label}>Select Your Hostel <Text allowFontScaling={false} style={{color:'red'}}>*</Text></Text>
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
        data={HostelList}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={formData?.hostel}
        onChange={item => {
          // setValue(item.value);
          setFormData({...formData, hostel : item.value})

        }}
        // renderLeftIcon={() => (
        //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        // )}
      />
      <Text allowFontScaling={false} 
      onPress={()=>navigation.navigate('HostelSign')}
      style={styles?.label_text}>Hostel Not Found? Add your hostel (Click here)</Text>

        <FormInput
          isRequired={true}
          label={'Email Address'}
          placeholder={'example@gmail.com'}
          helperText={'Please enter a valid email address.'}
          onChangeText={(value) => setFormData({ ...formData, email: value })}
          value={formData.email}
        />
        <FormInput
          isRequired={true}
          label={'Password'}
          placeholder={'Enter Your Password'}
          type='password'
          helperText={'Please enter your password'}
          onChangeText={(value) => setFormData({ ...formData, password: value })}
          value={formData.password}
        />
        {/* <FormInput
          isRequired={true}
          label={'Password'}
          placeholder={'Enter Your Password'}
          helperText={'Please enter your password'}
          onChangeText={(value) => setFormData({ ...formData, password: value })}
          value={formData.email}
        /> */}

        <FormInput
          isRequired={true}
          label={'Confirm Password'}
          placeholder={'Re-Enter Your Password'}
          helperText={'Please re-enter your password'}
          type='password'
          onChangeText={(value) => setFormData({ ...formData, cnfPass: value })}
          value={formData.cnfPass}
        />
        <UtilityBtn
          text={'Submit'}
          onSubmit={() => signUp()}
          customStyle={{ alignSelf: 'center' }}
        />
        <Text
          onPress={() => navigation.replace('Login')}
          color='blue.600' mb={10} mt='3' textAlign={'center'} >Already have an account? Login!</Text>
      </ScrollView>

<Loader
loading={loading}
/>

      <Modal
        animationType="slide"
        visible={modalVisible}
        statusBarTranslucent
        transparent
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <Pressable
          onPress={() => setModalVisible(!modalVisible)}
          style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 32, backgroundColor: "#0005" }}>
          <View style={styles.modalView}>
            <Pressable
              // style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(false)
                requestCameraPermission()
              }}>
              <Text allowFontScaling={false} style={styles.textStyle}>Camera</Text>
            </Pressable>
            <View
              style={{ backgroundColor: Colors.LightGrey, height: 2, width: '95%', alignSelf: 'center' }}
            />
            <Pressable
              // style={[styles.button, styles.buttonClose,{marginTop:5}]}
              onPress={() => {
                setModalVisible(false)
                selectFile()
              }}
            >
              <Text allowFontScaling={false} style={styles.textStyle}>Gallery</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignUp

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