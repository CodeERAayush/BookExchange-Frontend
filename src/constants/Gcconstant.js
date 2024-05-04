import { createRef } from 'react';
import { Colors } from './colors';
import { Fonts } from '../../asset/fonts';
import { showMessage } from 'react-native-flash-message';


let loaderRef;
let allPostFlatlistRef = createRef();

export function showError(message) {
    if (!message) return;

    showMessage({
        message: message,
        type: "danger",
        duration: 2000,
        titleStyle: {
            fontSize: 16,
            fontFamily: Fonts.Regular,
            color: Colors.Black
        },
        icon: "danger",
        style: { paddingTop: 25 },
    })
}

export function showSuccess(message) {
    if (!message) return;
    showMessage({
        message: message,
        type: "success",
        duration: 2000,
        titleStyle: {
            fontSize: 16,
            fontFamily: Fonts.Regular,
            color: Colors.White
        },
        icon: "success",
        style: { paddingTop: 25 },
    })
}
