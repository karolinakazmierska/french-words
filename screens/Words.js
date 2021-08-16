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
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Word{currentWords.length > 1 ? 's' : ''} of the day:</Text>

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


import colors from './../utils/colors.js';
const styles = StyleSheet.create({
    container: {
        paddingVertical: 80,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 16,
        marginBottom: 24,
        color: colors.dark,
        fontWeight: 'bold'
    },
    slider: {
        flexDirection: 'row'
    },
    slide: {
        justifyContent: 'center',
        width: width - 40
    },
    active: {
        backgroundColor: colors.primary
    },
    inactive: {
        backgroundColor: colors.light
    }
});
