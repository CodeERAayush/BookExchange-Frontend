/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  PermissionsAndroid,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Box, Pressable, StatusBar, Text, TextArea} from 'native-base';
import {Colors} from '../../constants/colors';
import FormInput from '../../components/cards/FormInput';
// import Button from '../../components/cards/Button'
import UtilityBtn from '../../components/cards/Button';
import {API} from '../../constants';
import axios from 'axios';
import {Fonts} from '../../../asset/fonts';
import Icon, {Icons} from '../../../asset/Icons/Icons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Loader from '../../components/cards/Loader';
import {showError, showSuccess} from '../../constants/Gcconstant';
import {useDispatch, useSelector} from 'react-redux';
import {setHostelList} from '../../slices/HostelList';
import {Dropdown} from 'react-native-element-dropdown';
import Header from '../../reusables/Header';
import messaging from '@react-native-firebase/messaging';
const SignUp = ({navigation}) => {
  const dispatch = useDispatch();
  const HostelList = useSelector(state => state.Hostel?.HostelList);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    cnfPass: '',
    firstName: '',
    lastName: '',
    picturePath: '',
    hostel: '',
    address: '',
    phone: '',
  });
  const [NotificationId, setNotificationid] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const signUp = () => {
    setLoading(true);
    const data = new FormData();
    data.append('firstName', formData?.firstName);
    data.append('lastName', formData?.lastName);
    data.append('email', formData?.email);
    data.append('password', formData?.password);
    data.append('address', formData?.address);
    data.append('hostel', formData?.hostel);
    data.append('phone', formData?.phone);
    data.append('picture', {
      uri: image.uri,
      type: image.type,
      name: image.fileName,
    });
    data.append('picturePath', formData?.picturePath);
    data.append('NotificationId', NotificationId);
    const params = {
      url: `${API.API_BASEURL}/${API.REGISTER}`,
      method: 'post',
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    axios(params)
      .then(() => {
        showSuccess('SuccessFully Registered!');
        navigation.replace('Login');
      })
      .catch(() => {
        showError('error in registration');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    callHostelList();
    getDeviceToken();
  }, []);

  const getDeviceToken = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      {
        title: 'App Notification Permission',
        message: 'App needs access to access your notifications ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const token = await messaging().getToken();
      setNotificationid(token);
    } else {
      // User decline
    }
  };

  const callHostelList = () => {
    setLoading(true);
    const params = {
      url: `${API?.API_BASEURL}/${API?.HOSTEL_LIST}`,
      method: 'get',
    };
    axios(params)
      .then(response => dispatch(setHostelList(response?.data?.data)))
      .catch(err => console.log('err: ', err))
      .finally(() => setLoading(false));
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        cameraLaunch();
      } else {
        // Camera permission denied
      }
    } catch (err) {
      // Handle error
    }
  };

  const cameraLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchCamera(options, res => {
      if (res.didCancel) {
        // User cancelled image picker
      } else if (res.error) {
        // ImagePicker Error
      } else if (res.customButton) {
        Alert.alert(res.customButton);
      } else {
        let source = res;
        setFormData({...formData, picturePath: source.assets[0]?.fileName});
        setImage(source.assets[0]);
      }
    });
  };

  const selectFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose file from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, res => {
      if (res.didCancel) {
        // User cancelled image picker
      } else if (res.error) {
        // ImagePicker Error
      } else if (res.customButton) {
        Alert.alert(res.customButton);
      } else {
        let source = res;
        setFormData({...formData, picturePath: source.assets[0]?.fileName});
        setImage(source.assets[0]);
      }
    });
  };

  const validateForm = () => {
    const {
      email,
      password,
      cnfPass,
      firstName,
      lastName,
      address,
      phone,
      hostel,
    } = formData;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !cnfPass ||
      !address ||
      !hostel ||
      !phone
    ) {
      showError('All fields are required.');
      return false;
    }

    if (!validateEmail(email)) {
      showError('Invalid email address.');
      return false;
    }

    if (password !== cnfPass) {
      showError('Passwords do not match.');
      return false;
    }

    if (phone.length !== 10) {
      showError('Phone number must be 10 digits.');
      return false;
    }

    return true;
  };

  const validateEmail = email => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSignUp = () => {
    if (validateForm()) {
      signUp();
    }
  };

  return (
    <SafeAreaView backgroundColor={Colors?.White} flex={1}>
      <StatusBar backgroundColor={Colors?.White} barStyle={'dark-content'} />
      <Header dontShowCart={true} navigation={navigation} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{backgroundColor: 'white', flex: 1}}>
        <Box mx="5%" flex={1}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always">
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: Colors?.Black,
                  fontSize: 22,
                  fontWeight: '700',
                  marginTop: 20,
                  fontFamily: Fonts?.Poppins_SemiBold,
                }}>
                Create Account
              </Text>
            </View>

            <FormInput
              value={formData?.firstName}
              customStyle={{marginTop: 35}}
              placeholder={'First Name'}
              onChangeText={text => setFormData({...formData, firstName: text})}
              textContentType="name"
            />
            <FormInput
              value={formData?.lastName}
              customStyle={{marginTop: 15}}
              placeholder={'Last Name'}
              onChangeText={text => setFormData({...formData, lastName: text})}
              textContentType="name"
            />
            <FormInput
              value={formData?.email}
              customStyle={{marginTop: 15}}
              placeholder={'Email'}
              onChangeText={text => setFormData({...formData, email: text})}
              keyboardType="email-address"
              textContentType="emailAddress"
            />
            <FormInput
              value={formData?.phone}
              customStyle={{marginTop: 15}}
              placeholder={'Phone Number'}
              onChangeText={text => setFormData({...formData, phone: text})}
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
            />
            <FormInput
              value={formData?.address}
              customStyle={{marginTop: 15}}
              placeholder={'Address'}
              onChangeText={text => setFormData({...formData, address: text})}
              textContentType="fullStreetAddress"
            />

            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              containerStyle={styles.containerStyle}
              activeColor="rgba(0,0,0,0.1)"
              data={HostelList}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select Hostel"
              searchPlaceholder="Search..."
              value={formData.hostel}
              onChange={item => {
                setFormData({...formData, hostel: item.value});
              }}
            />
            <FormInput
              value={formData?.password}
              customStyle={{marginTop: 15}}
              placeholder={'Password'}
              onChangeText={text => setFormData({...formData, password: text})}
              textContentType="password"
              secureTextEntry={true}
            />
            <FormInput
              value={formData?.cnfPass}
              customStyle={{marginTop: 15}}
              placeholder={'Confirm Password'}
              onChangeText={text => setFormData({...formData, cnfPass: text})}
              textContentType="password"
              secureTextEntry={true}
            />
            <Pressable
              onPress={() => setModalVisible(true)}
              style={{
                marginTop: 10,
                marginLeft: 20,
                width: '50%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon
                type={Icons.Ionicons}
                name={'cloud-upload-outline'}
                color={'#ababab'}
                size={20}
              />
              <Text
                style={{
                  fontSize: 14,
                  marginLeft: 5,
                  color: '#ababab',
                  fontFamily: Fonts?.Poppins_SemiBold,
                }}>
                Upload Profile Picture
              </Text>
            </Pressable>
            <UtilityBtn
              text={'Submit'}
              onSubmit={() => handleSignUp()}
              customStyle={{alignSelf: 'center'}}
            />
          </ScrollView>
        </Box>
      </KeyboardAvoidingView>
      {loading && <Loader />}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={{alignSelf: 'flex-end'}}
              onPress={() => setModalVisible(!modalVisible)}>
              <Icon
                type={Icons.FontAwesome}
                name={'times'}
                color={Colors?.Black}
                size={15}
              />
            </Pressable>
            <Text style={styles.modalText}>Upload Image</Text>
            <Pressable style={styles.button} onPress={requestCameraPermission}>
              <Text style={styles.textStyle}>Camera</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={selectFile}>
              <Text style={styles.textStyle}>Gallery</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 0.5,
    borderRadius: 5,
    marginTop: 15,
    paddingHorizontal: 8,
  },
  containerStyle: {
    borderColor: '#e1e1e1',
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: Colors?.Black,
    fontFamily: Fonts?.Poppins_Regular,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Colors?.Black,
    fontFamily: Fonts?.Poppins_Regular,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
  button: {
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    elevation: 2,
    width: 200,
    height: 45,
    backgroundColor: Colors?.Primary_Color,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: Colors?.Black,
    fontFamily: Fonts?.Poppins_SemiBold,
  },
});
