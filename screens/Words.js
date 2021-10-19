import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList, Dimensions } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import Word from './../components/Word.js';
import PreviousWord from './../components/PreviousWord.js';
import { data } from './../utils/data.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Settings from './Settings.js';

// @TODO: move utils/data.js into remote storage (Firebase?)

const { width, height } = Dimensions.get('window');
const NUM = 'words_number';
const CURRENT = 'current_words';
const PREVIOUS = 'previous_words';

export default function Words() {

    /* @TEMPORARY: cleans AsyncStorage */
    const removeItemValue = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        }
        catch(e) {
            return false;
        }
    }
    // removeItemValue(CURRENT);
    // removeItemValue(PREVIOUS);
    // removeItemValue(NUM);

    /*** Number of words per day to display */
    const [wordsNumber, setWordsNumber] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    /* Today's words and words from previous days */
    const [currentWords, setCurrentWords] = useState([]);
    const [previousWords, setPreviousWords] = useState([]);

    useEffect(() => {
        console.log('USE EFFECT 1')
        getWordsNumber();
    }, [])

    useEffect(() => {
        if (wordsNumber) {
            console.log('USE EFFECT 2 -- words number changed and is now', wordsNumber)

            getCurrentWords();
        }
    }, [wordsNumber]);

    const getWordsNumber = async () => {
        try {
            const value = await AsyncStorage.getItem(NUM);
            if (value !== null) {
                console.log('NUM value is not null, proceeding');
                setWordsNumber(value);
                // getCurrentWords();
            } else {
                console.log('NUM value is null, stop');
                setModalVisible(true);
            }
        } catch(e) {
            console.log(e)
        }
    }

    const saveNumber = (n) => {
        console.log('Save number function', n)
        if (n) {
            n = (typeof n == "number" ? n : parseInt(n))
            setWordsNumber(n);
            saveWordsNumber(n);
            setModalVisible(false);
            // @TODO: before hiding the modal, prepare all the words here
        }
    }

    const saveWordsNumber = async (n) => {
        try {
            await AsyncStorage.setItem(NUM, JSON.stringify(n))
            console.log('Saved number')
        } catch (e) {
            console.log(e)
        }
    }

    /** Getting words listed as current in AsyncStorage */
    const getCurrentWords = async () => {
        let currentTime = new Date();
        currentTime.setDate(currentTime.getDate() + 6); // @TEMPORARY: mock to increment date by one c
        let date = currentTime.toDateString();
        console.log('DATE', date);
        let words = [];

        try {
            const jsonValue = await AsyncStorage.getItem(CURRENT);
            const value = (jsonValue != null ? JSON.parse(jsonValue) : null);
            console.log('CURRENT', value);

            // Words from today already saved under 'current_words'
            if (value && value.date == date && value.words.length > 0) {
                console.log('**1')

                /* If the words have been loaded but the user has changed daily words number */
                if (value.words.length == wordsNumber) {
                    console.log('A')
                    words = value.words
                } else if (value.words.length > wordsNumber) {
                    console.log('B', value.words.length, wordsNumber);
                    words = value.words.slice(0,wordsNumber);
                    saveCurrentWords(date, words);
                } else if (value.words.length < wordsNumber) {
                    console.log('C')
                    let additionalWords = getRandomWords(wordsNumber - value.words.length);
                    words = [...value.words, ...additionalWords];
                    saveCurrentWords(date, words);
                }

                getPreviousWords();

            // Words from previous days are under 'current_words'
            } else if (value && value.date != date) {
                console.log('**2')
                setPreviousWords([...previousWords, ...value.words]);
                savePreviousWords([...previousWords, ...value.words]);
                words = getRandomWords(wordsNumber);
                saveCurrentWords(date, words);

            // Other - e.g. first time in the app
            } else {
                console.log('**3')
                words = getRandomWords(wordsNumber);
                saveCurrentWords(date, words);
                setPreviousWords([]); // ?
            }
            setCurrentWords(words);
        } catch(e) {
            console.log(e)
        }
    }

    const getRandomWords = (n) => {
        console.log('Get random words')
        // @TODO: make sure words don't repeat themselves*
        let arr = [];
        for (let i = 0; i < parseInt(n); i++) {
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
            console.log(e)
        }
    }

    /** Getting words generated in previous days */
    const getPreviousWords = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(PREVIOUS);
            const value = (jsonValue != null ? JSON.parse(jsonValue) : []);
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
            console.log(e)
        }
    }



    return (
        <SafeAreaView styles={styles.mainView}>
            <Settings visible={modalVisible} saveNumber={saveNumber} />
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
                    {
                        previousWords && previousWords.length > 0 ? (
                            <FlatList
                                data={[...previousWords].reverse()}
                                keyExtractor={item => item}
                                renderItem={({ item }) => (
                                    <PreviousWord word={item} />
                                )}
                            />
                        ) : (
                            <Text>No previous words to show</Text>
                        )
                    }

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
