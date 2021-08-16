import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Words({ word }) {
    console.log(word)
    return (
        <View style={styles.word}>
            <Text>This is one single word: {word}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    word: {
        flexDirection: 'column',
        padding: 20,
        height: 'auto',
        width: '100%',
        backgroundColor: 'red',
        justifyContent: 'center',
    },
});
