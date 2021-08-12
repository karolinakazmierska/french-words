import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Words() {
    return (
        <View style={styles.container}>
            <Text>Words</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
