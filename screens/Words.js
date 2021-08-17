import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList, Dimensions } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import Word from './../components/Word.js';
import PreviousWord from './../components/PreviousWord.js';
import { data } from './../utils/data.js';

// @TODO: move utils/data.js into remote storage (Firebase?)

const { width, height } = Dimensions.get('window');

export default function Words() {

    const [currentWords, setCurrentWords] = useState([]);
    useEffect(() => {
        // @TODO: Get user's number of words from storage (hardcoded for now)
        let num = 2;

        let words = [];
        for (let i = 0; i < num; i++) {
            let w = data[Math.floor(Math.random() * data.length)];
            words.push(w);
        }
        // @TODO: also check if there are words from today in storage
        // @TODO: make sure words don't repeat themselves*
        // @TODO: save fetched words to storage

        console.log(words);
        setCurrentWords(words);

    }, []);

    const [previousWords, setPreviousWords] = useState([]);
    useEffect(() => {
        // @TODO: check if there are previous words in storage
        let words = ['prevWord', 'anotherOne', 'lastOne', 'hello', 'good morning', 'bonjour', 'merci', 'voila', 'scroll'];
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
