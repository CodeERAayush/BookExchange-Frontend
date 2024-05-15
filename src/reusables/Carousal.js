import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Colors } from '../constants/colors'
import { API } from '../constants'
import FastImage from 'react-native-fast-image'

const Carousal = ({ images }) => {

    const [scrollIndex, setScrollIndex] = useState(0)

    const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
        if (viewableItems?.length) {
            setScrollIndex(viewableItems[viewableItems?.length - 1].index);
        }
    }, []);

    
    return (
        <View style={styles?.carousal_card}>
            <FlatList
                data={images}
                horizontal
                pagingEnabled
                windowSize={1}
                onViewableItemsChanged={onViewableItemsChanged}
                renderItem={({ item, index }) => {
                return<FastImage
                    source={{ uri: API.API_BASEURL+'/assets/'+item }}
                    style={{ height: hp(25), width: wp(90) }}
                    resizeMode='contain'
                />}}
            />
            {images?.length > 1 ?
                <View style={styles?.locator}>
                    {images.map((_, index) => {
                        if (index === scrollIndex)
                            return <View key={index} style={styles?.dark}>
                            </View>
                        return <View key={index} style={styles?.light}>
                        </View>
                    })}
                </View>
                : null}
        </View>
    )
}

export default Carousal

const styles = StyleSheet.create({
    carousal_card: {
        width: '100%',
    },
    locator: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: hp(1), position: 'absolute', bottom: hp(2), left: wp(5) },
    dark: { height: wp(1.5), width: wp(5), borderRadius: 9999, backgroundColor: Colors?.darkYellow, marginHorizontal: wp(0.5) },
    light: { height: wp(1.5), width: wp(1.5), borderRadius: 9999, backgroundColor: Colors?.black20, marginHorizontal: wp(0.5) }
})