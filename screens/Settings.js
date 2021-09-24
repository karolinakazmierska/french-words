import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Modal, FlatList, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const padding = 20;
const options = [1,2,3,4];
const buttonMarginRight = 20;
const buttonWidth = (width - 2 * padding) / 4 - buttonMarginRight * (options.length - 1) / options.length;

export default function Settings({ visible, saveNumber }) {

    const [selected, setSelected] = useState(1);

    // const update = () => {
    //     console.log('saving', selected)
    // }

    return (
        <Modal visible={visible}>
            <View style={styles.modalView}>
                <Text style={styles.title}>How many words per day would you like to learn?</Text>
                <FlatList
                    data={options}
                    horizontal={true}
                    keyExtractor={item => item}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity style={[styles.button, (selected === item ? styles.selectedButton : '')]} onPress={() => setSelected(item)}>
                                <Text style={[styles.text, (selected === item ? styles.selectedText : '')]}>{item.toString()}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
                <TouchableOpacity style={styles.save} onPress={() => saveNumber(selected)}>
                    <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

import s from './../utils/styles.js';
const styles = StyleSheet.create({
    modalView: {
        paddingTop: 100,
        paddingHorizontal: padding,
        marginTop: 22
    },
    title: {
        fontSize: 16,
        marginBottom: 24,
        color: s.dark,
        fontWeight: 'bold'
    },
    button: {
        display: 'flex',
        backgroundColor: s.light,
        width: buttonWidth,
        height: buttonWidth,
        marginRight: buttonMarginRight,
        borderRadius: s.radius,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectedButton: {
        backgroundColor: s.primary,
    },
    text: {
        fontSize: 20,
        color: s.primary
    },
    selectedText: {
        color: s.light
    },
    save: {
        backgroundColor: s.primary,
        marginTop: 24,
        padding: 10,
        borderRadius: s.radius,
        margin: 60
    },
    saveText: {
        fontSize: 24,
        color: s.light,
        textAlign: 'center'
    }
});
