import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList, Dimensions } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import Word from './../components/Word.js';
import PreviousWord from './../components/PreviousWord.js';
import { data } from './../utils/data.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// @TODO: move utils/data.js into remote storage (Firebase?)

const { width, height } = Dimensions.get('window');
const NUM = 'words_number';
const CURRENT = 'current_words';
const PREVIOUS = 'previous_words';

export default function Words() {

    /*** Number of words per day to display */
    const [wordsNumber, setWordsNumber] = useState('');
    useEffect(() => {
        const getWordsNumber = async () => {
            try {
                const value = await AsyncStorage.getItem(NUM);
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

    const [currentWords, setCurrentWords] = useState([]);
    const [previousWords, setPreviousWords] = useState([]);

    useEffect(() => {

        /** Getting words listed as current in AsyncStorage */
        const getCurrentWords = async () => {
            let currentTime = new Date();
            let date = currentTime.toDateString();
            let words = [];

            try {
                const jsonValue = await AsyncStorage.getItem(CURRENT);
                const value = (jsonValue != null ? JSON.parse(jsonValue) : null);

                // Words from today already saved under 'current_words'
                if (value && value.date == date && value.words.length > 0) {
                    words = value.words;
                    getPreviousWords();

                // Words from previous days are under 'current_words'
                } else if (value && value.date != date) {
                    setPreviousWords([...previousWords, ...value.words]);
                    savePreviousWords([...previousWords, ...value.words]);
                    words = getRandomWords();
                    saveCurrentWords(date, words);

                // Other - e.g. first time in the app
                } else {
                    words = getRandomWords();
                    saveCurrentWords(words);
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

        /** Saving today's words as current to AsyncStorage */
        const saveCurrentWords = async (date, words) => {
            let obj = {
                date: date,
                words: words
            }
            try {
                const jsonValue = JSON.stringify(obj)
                await AsyncStorage.setItem(CURRENT, jsonValue)
            } catch (e) {
                // saving error
            }
        }

        /** Getting words generated in previous days */
        const getPreviousWords = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem(PREVIOUS);
                const value = (jsonValue != null ? JSON.parse(jsonValue) : null);
                setPreviousWords(value);
            } catch(e) {
                console.log(e)
            }
        }

        /** Saving words generated in previous days to AsyncStorage */
        const savePreviousWords = async (words) => {
            try {
                const jsonValue = JSON.stringify(words)
                await AsyncStorage.setItem(PREVIOUS, jsonValue)
            } catch (e) {
                // saving error
            }
        }
    }, []);




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
