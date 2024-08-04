import React from 'react';
import { Modal, FlatList, Pressable, Text, StyleSheet } from 'react-native';
import { Box, Button } from 'native-base';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../../asset/fonts';

const HostelSelectionModal = ({ visible, onClose, onSelect, hostels }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Box flex={1} justifyContent="center" alignItems="center" bg="rgba(0,0,0,0.5)">
        <Box bg="white" p={4} borderRadius={10} width="80%" shadow={2}>
          <FlatList
            data={hostels}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <Pressable
                style={styles.hostelItem}
                onPress={() => onSelect(item._id)}
              >
                <Text style={styles.hostelText}>{item?.hostelName}</Text>
              </Pressable>
            )}
          />
          <Button mt={4} onPress={onClose} colorScheme="danger">
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const styles = StyleSheet.create({
  hostelItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  hostelText: {
    fontFamily: Fonts.Regular,
    fontSize: 16,
    color:Colors?.Black
  },
});

export default HostelSelectionModal;
