import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList, Dimensions } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import Word from './../components/Word.js';
import PreviousWord from './../components/PreviousWord.js';
import { data } from './../utils/data.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// @TODO: move utils/data.js into remote storage (Firebase?)

const { width, height } = Dimensions.get('window');

export default function Words() {

    /*** Number of words per day to display */
    const [wordsNumber, setWordsNumber] = useState('');
    useEffect(() => {
        const getWordsNumber = async () => {
            try {
                const value = await AsyncStorage.getItem('words_number');
                if (value !== null) {
                    setWordsNumber(value);
                }
                // @TODO: temp. solution - if value is null, take user to settings screen
                else {
                    setWordsNumber(2);
                }
            } catch(e) {
                console.log(e)
            }
        }
        getWordsNumber()
    }, [])

    /*** Today's words to display */
    const [currentWords, setCurrentWords] = useState([]);
    useEffect(() => {
        let currentTime = new Date();
        let date = currentTime.toDateString();
        let words = [];

        const getCurrentWords = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('current_words');
                const value = (jsonValue != null ? JSON.parse(jsonValue) : null);
                console.log(value)
                if (value && value.date == date) { // Words from today already saved
                    words = value.words;
                } else if (value && value.date != date) { // Words from previous day present
                    setPreviousWords(...previousWords, value) // @TODO: test!
                    words = getRandomWords();
                    saveTodaysWords(words);
                } else {
                    words = getRandomWords();
                    saveTodaysWords(words);
                }
                setCurrentWords(words);
            } catch(e) {
                console.log(e)
            }
        }
        getCurrentWords();

        const getRandomWords = () => {
            // @TODO: make sure words don't repeat themselves*
            let arr = [];
            for (let i = 0; i < wordsNumber; i++) {
                let w = data[Math.floor(Math.random() * data.length)];
                arr.push(w);
            }
            return arr;
        }

        const saveTodaysWords = async (value) => {
            let obj = {
                date: date,
                words: value
            }
            try {
                const jsonValue = JSON.stringify(obj)
                await AsyncStorage.setItem('current_words', jsonValue)
            } catch (e) {
                // saving error
            }
        }
    }, []);

    /*** Words displayed in previous days */
    const [previousWords, setPreviousWords] = useState([]);
    useEffect(() => {
        // @TODO: get previous words from AsyncStorage
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
