import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function HeaderButton({ text, toggleModal }) {
    return (
        <TouchableOpacity onPress={toggleModal} style={styles.headerButton}>
            <Text style={styles.text}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

import s from './../utils/styles.js';
const styles = StyleSheet.create({
    headerButton: {
        position: 'absolute',
        top: 60,
        right: s.paddingHorizontal,
        padding: 10,
        backgroundColor: s.light,
        borderRadius: s.radius
    },
    text: {
        color: s.primary
    }
})
