import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Modal, FlatList, TouchableOpacity } from 'react-native';

export default function Settings({ visible }) {

    let options = ['1','2','3','4'];
    const [selected, setSelected] = useState('1');

    return (
        <Modal visible={visible}>
            <View style={styles.modalView}>
                <Text style={styles.title}>How many words per day would you like to learn?</Text>
                <FlatList
                    data={options}
                    keyExtractor={item => item}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity onPress={() => setSelected(item)}>
                                <Text
                                    style={[styles.button, (selected === item ? styles.selected : styles.notSelected)]}
                                >{item}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        </Modal>
    )
}

import s from './../utils/styles.js';
const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        paddingTop: 100,
        paddingHorizontal: 20,
        marginTop: 22
    },
    title: {
        fontSize: 16,
        marginBottom: 24,
        color: s.dark,
        fontWeight: 'bold'
    },
    button: {
        fontSize: 28
    },
    selected: {
        color: s.dark
    }
});
