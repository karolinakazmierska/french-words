import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Words({ word }) {
    return (
        <View style={styles.word}>
            <Text style={styles.text}>This is one single word: {word}</Text>
        </View>
    );
}

import s from './../utils/styles.js';
const styles = StyleSheet.create({
    word: {
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: s.primary,
        padding: 20,
        borderRadius: s.radius,
        marginRight: 10
    },
    text: {
        color: s.light
    }
});
