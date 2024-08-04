import {Alert, StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native';
import React, { memo, useState } from 'react';
import { Colors } from '../constants/colors';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { Images } from '../../asset/images';
import { Fonts } from '../../asset/fonts';
import Icon, { Icons } from '../../asset/Icons/Icons';
import LottieView from 'lottie-react-native';
import MakeFav from './MakeFav';
import { API } from '../constants';
import FastImage from 'react-native-fast-image';
import CustomMenu from '../components/CustomMenu';

const ItemCard = ({ item, onPressCart, naviagtion, favou, canDelete = false,onPressDelete }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuToggle = () => {
    setMenuVisible(!menuVisible);
  };
  const handleDelete = () => {
    Alert.alert(
      'Delete Item',
      `Do you want to delete ${item?.name}?`,
      [
        {
          text: 'Cancel',
          onPress: () => setMenuVisible(false),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            onPressDelete()
            setMenuVisible(false);
            // Add your delete logic here
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Pressable
        key={item?._id}
        onPress={() => naviagtion.navigate('Product', { id: item?._id })}
        style={styles?.card}
      >
        <MakeFav
          item={item}
          favou={favou}
          style={{
            position: 'absolute',
            left: widthPercentageToDP(3),
            top: heightPercentageToDP(1),
            zIndex: 10,
            backgroundColor: Colors?.LightGrey,
            padding: widthPercentageToDP(1),
            borderRadius: 999,
          }}
          iconStyle={{ height: 20, width: 20 }}
        />
        {canDelete && (
          <TouchableOpacity
            onPress={handleMenuToggle}
            style={{
              position: 'absolute',
              right: widthPercentageToDP(3),
              top: heightPercentageToDP(1),
              zIndex: 10,
              padding: widthPercentageToDP(1),
              backgroundColor:Colors?.LightGrey,
              borderRadius:999
            }}
          >
            <Icon 
            type={Icons?.Ionicons}
            name="ellipsis-vertical" size={20} color={Colors.Black} />
          </TouchableOpacity>
        )}
        <View style={styles.img_holder}>
          {item?.image.length > 0 ? (
            <FastImage
              source={{ uri: API.API_BASEURL + '/assets/' + item?.image[0] }}
              style={[styles?.img, { width: '100%', height: '100%' }]}
              resizeMode="cover"
            />
          ) : (
            <Image source={Images?.no_image} style={styles?.img} resizeMode="contain" />
          )}
        </View>
        <View style={styles.data_holder}>
          <View style={styles.heading_holder}>
            <Text allowFontScaling={false} style={styles.price_text}>
              {item?.price} ₹
            </Text>
            <TouchableOpacity onPress={() => onPressCart(item)}>
              <Image source={Images?.add_to_cart} style={styles?.add_cart_btn} />
            </TouchableOpacity>
          </View>
          <Text allowFontScaling={false} style={styles.title}>
            {item?.name?.length > 15 ? item?.name.slice(0, 15) + '...' : item?.name}
          </Text>
        </View>
      </Pressable>
      <CustomMenu visible={menuVisible} onClose={handleMenuToggle} onDelete={handleDelete} />
    </View>
  );
};

export default memo(ItemCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors?.LightGrey,
    width: '98%',
    marginVertical: 2,
    height: heightPercentageToDP(28),
    borderRadius: widthPercentageToDP(1),
  },
  heading: {
    color: 'black',
  },
  img_holder: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: '55%',
    marginTop: heightPercentageToDP(0.6),
    borderRadius: widthPercentageToDP(5),
    overflow: 'hidden',
  },
  img: {
    height: heightPercentageToDP(10),
    tintColor: Colors?.Black,
  },
  data_holder: {
    marginTop: heightPercentageToDP(3),
  },
  heading_holder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    paddingHorizontal: widthPercentageToDP(2),
  },
  price_text: {
    color: Colors?.Black,
    fontFamily: Fonts.Bold,
    fontWeight: '600',
    fontSize: 16,
    color: Colors?.darkMagicBlue,
  },
  add_cart_btn: {
    height: widthPercentageToDP(8),
    width: widthPercentageToDP(8),
  },
  title: {
    color: Colors?.black45,
    fontSize: 12,
    marginHorizontal: widthPercentageToDP(4),
    letterSpacing: 0.6,
    lineHeight: 16,
    fontWeight: '400',
    fontFamily: Fonts.Medium,
  },
});
