import React from 'react';
import { StyleSheet, View } from 'react-native';
import Words from './screens/Words.js';

export default function App() {
    return (
        <Words />
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
