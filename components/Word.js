import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Words({ word }) {
    return (
        <View style={styles.word}>
            <Text style={styles.text}>This is one single word: {word}</Text>
        </View>
    );
}

import colors from './../utils/colors.js';
const styles = StyleSheet.create({
    word: {
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        padding: 20,
        borderRadius: 10,
        marginRight: 10
    },
    text: {
        color: colors.light
    }
});
