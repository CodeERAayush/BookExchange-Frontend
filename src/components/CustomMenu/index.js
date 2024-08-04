import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { Colors } from '../../constants/colors';

const CustomMenu = ({ visible, onClose, onDelete }) => {
  if (!visible) return null;

  return (
    <TouchableOpacity style={styles.overlay} onPress={onClose}>
      <View style={styles.menu}>
        <TouchableOpacity onPress={onDelete} style={styles.menuItem}>
          <Text style={styles.menuItemText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    width: widthPercentageToDP(50),
    backgroundColor: Colors.White,
    borderRadius: 8,
    elevation: 5,
  },
  menuItem: {
    padding: heightPercentageToDP(2),
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGrey,
  },
  menuItemText: {
    fontSize: 16,
    color: Colors.Black,
  },
});

export default CustomMenu;
