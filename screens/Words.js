import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList, Dimensions } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import Word from './../components/Word.js';
import PreviousWord from './../components/PreviousWord.js';

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

    const [previousWords, setPreviousWords] = useState([]);
    useEffect(() => {
        // @TODO: check if there are previous words in storage
        let words = ['prevWord', 'anotherOne', 'lastOne', 'hello', 'good morning', 'bonjour', 'merci', 'voila', 'scroll'];
        console.log(words);
        setPreviousWords(words);
    }, [])

    return (
        <SafeAreaView styles={styles.mainView}>
            <ScrollView style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.title}>Word{currentWords.length > 1 ? 's' : ''} of the day:</Text>
                    <SwiperFlatList
                        index={0}
                        data={currentWords}
                        style={styles.slider}
                        showPagination
                        paginationStyle={styles.pagination}
                        paginationStyleItemActive={styles.active}
                        paginationStyleItemInactive={styles.inactive}
                        renderItem={({ item }) => (
                            <View style={styles.slide}>
                              <Word word={item}>{item}</Word>
                            </View>
                        )}
                    />
                </View>

                <View style={[styles.section, styles.previous]}>
                    <Text style={styles.title}>Previous words:</Text>
                    <FlatList
                        data={previousWords}
                        keyExtractor={item => item}
                        renderItem={({ item }) => (
                            <PreviousWord word={item} />
                        )}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


import s from './../utils/styles.js';
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        paddingTop: 80,
    },
    container: {
        marginTop: 60,
        paddingHorizontal: 20
    },
    section: {
        
    },
    previous: {
        flex: 1
    },
    title: {
        fontSize: 16,
        marginBottom: 24,
        color: s.dark,
        fontWeight: 'bold'
    },
    slider: {
        flexDirection: 'row',
        marginBottom: 60
    },
    slide: {
        justifyContent: 'center',
        width: width - 40
    },
    pagination: {
        height: 60,
        alignItems: 'center',
        marginBottom: 0
    },
    active: {
        backgroundColor: s.primary
    },
    inactive: {
        backgroundColor: s.light
    }
});
