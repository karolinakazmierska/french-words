import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function PreviousWord({ word }) {
    const [isExpanded, toggleExpanded] = useState(false);

    return (
        <View style={styles.word}>
            <View style={styles.header}>
                <Text style={styles.text}>This is previous word: {word}</Text>
                <Text onPress={() => toggleExpanded(!isExpanded)}>
                    {isExpanded ? 'up' : 'down'}
                </Text>
            </View>

            {isExpanded ? (
                <View style={styles.body}>
                    <Text>Expanded view</Text>
                </View>
            ) : null}
        </View>
    );
}

import s from './../utils/styles.js';
const styles = StyleSheet.create({
    word: {
        padding: 20,
        backgroundColor: s.light,
        marginBottom: 30,
        borderRadius: s.radius,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    body: {

    },
    text: {
        color: s.dark
    }
});
