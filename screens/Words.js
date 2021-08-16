import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import Word from './../components/Word.js';

const { width, height } = Dimensions.get('window');

export default function Words() {

    const [currentWords, setCurrentWords] = useState([]);
    useEffect(() => {
        // @TODO: check if there are words from today in storage
        // If not, get them from API and save them to storage
        // If yes, get them from storage
        let words = ['hello', 'world', 'bye'];
        setCurrentWords(words);
        console.log(words)
    }, []);

    return (
        <View style={styles.container}>
            <Text>Word(s) of the day: {currentWords}</Text>

            <SwiperFlatList
                index={0}
                data={currentWords}
                style={styles.slider}
                showPagination
                paginationStyleItemActive={styles.active}
                paginationStyleItemInactive={styles.inactive}
                renderItem={({ item }) => (
                    <View style={styles.slide}>
                      <Word word={item}>{item}</Word>
                    </View>
                )}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 80,
        paddingHorizontal: 20,
    },
    slider: {
        flexDirection: 'row'
    },
    slide: {
        justifyContent: 'center',
        width: width - 40
    },
    active: {
        backgroundColor: 'red'
    },
    inactive: {
        backgroundColor: 'blue'
    }
});
