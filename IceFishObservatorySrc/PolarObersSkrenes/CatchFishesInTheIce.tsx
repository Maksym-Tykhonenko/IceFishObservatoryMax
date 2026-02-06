import React, { useState, useEffect } from 'react';
import {
    Dimensions,
    Text,
    TouchableOpacity,
    View,
    ScrollView, // додано
    Image,
    ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FisobvatoryMdl from '../ServatorComopnetos/FisobvatoryMdl';
import numberedfishestocatch from '../Sevartdata/numberedfishestocatch';
import { sihecifntsor } from '../sihecifntsor';

const butnsgrond = require('../IceFishObservatoryAssets/IsoberImagis/butnsgrond.png');
const lockIcon = require('../IceFishObservatoryAssets/IsoberImagis/filovack.png');
const backard = require('../IceFishObservatoryAssets/IsoberImagis/backard.png');
const rodIcon = require('../IceFishObservatoryAssets/IsoberImagis/fishingrod.png');
const elementsGrnd = require('../IceFishObservatoryAssets/IsoberImagis/elementsGrnd.png');
const womanLose = require('../IceFishObservatoryAssets/IsoberImagis/womanLose.png');
const womanWin = require('../IceFishObservatoryAssets/IsoberImagis/womanWin.png');
const ticketIcon = require('../IceFishObservatoryAssets/IsoberImagis/obserticket.png');

const LEVELS = [
    { name: 'Easy Level', count: 5 },
    { name: 'Beginner', count: 6 },
    { name: 'Medium Level', count: 8 },
    { name: 'Advanced', count: 10 },
    { name: 'Hard Level', count: 12 },
    { name: 'Expert', count: 14 },
    { name: 'Extreme Level', count: 15 },
    { name: 'Master', count: 17 },
    { name: 'Legend', count: 18 },
    { name: 'Ultimate', count: 20 },
];

const { width: W, height: H } = Dimensions.get('window');

export default function CatchFishesInTheIce() {
    const [modalVisible, setModalVisible] = useState(false);
    const [levelUnlocked, setLevelUnlocked] = useState(Array(LEVELS.length).fill(false).map((_, i) => i === 0));
    const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
    const [showFishReveal, setShowFishReveal] = useState(false);
    const [shuffledFish, setShuffledFish] = useState<number[]>([]);
    const [cardStates, setCardStates] = useState<boolean[]>([]);
    const [currentOrder, setCurrentOrder] = useState(1);
    const [lives, setLives] = useState(3);
    const [gameOver, setGameOver] = useState(false);
    const [win, setWin] = useState<boolean | null>(null); // null = not finished, true = win, false = lose

    // Load unlocked levels from AsyncStorage
    useEffect(() => {
        (async () => {
            let unlocked = Array(LEVELS.length).fill(false).map((_, i) => i === 0);
            try {
                for (let i = 1; i < LEVELS.length; i++) {
                    const res = await AsyncStorage.getItem(`level_${i}_completed`);
                    if (res === 'true') unlocked[i] = true;
                }
            } catch { }
            setLevelUnlocked(unlocked);
        })();
    }, []);

    // When level selected, shuffle fish and show reveal
    useEffect(() => {
        if (selectedLevel !== null) {
            const fishArr = Array.from({ length: LEVELS[selectedLevel].count }, (_, i) => i + 1);
            const shuffled = fishArr.sort(() => Math.random() - 0.5);
            setShuffledFish(shuffled);
            setCardStates(Array(fishArr.length).fill(false));
            setCurrentOrder(1);
            setLives(3);
            setGameOver(false);
            setWin(null);
            setShowFishReveal(true);
            setTimeout(() => setShowFishReveal(false), 2000);
        }
    }, [selectedLevel]);

    // Handle card tap
    const handleCardTap = (idx: number) => {
        if (gameOver || showFishReveal || cardStates[idx]) return;
        const fishNum = shuffledFish[idx];
        if (fishNum === currentOrder) {
            // Correct tap
            const newStates = [...cardStates];
            newStates[idx] = true;
            setCardStates(newStates);
            if (currentOrder === shuffledFish.length) {
                // Level complete
                setWin(true);
                setGameOver(true);
                handleWin();
            } else {
                setCurrentOrder(currentOrder + 1);
            }
        } else {
            // Wrong tap
            if (lives - 1 === 0) {
                setWin(false);
                setGameOver(true);
            }
            setLives(lives - 1);
            setCardStates(Array(shuffledFish.length).fill(false));
            setCurrentOrder(1);
        }
    };

    // Handle win: add tickets to AsyncStorage
    const handleWin = async () => {
        if (selectedLevel === null) return;
        const ticketsToAdd = 5 * (selectedLevel + 1);
        try {
            // tickets
            const ticketsRaw = await AsyncStorage.getItem('tickets');
            const tickets = ticketsRaw ? parseInt(ticketsRaw, 10) : 0;
            await AsyncStorage.setItem('tickets', (tickets + ticketsToAdd).toString());
            // totalTicketsEarned
            const totalRaw = await AsyncStorage.getItem('totalTicketsEarned');
            const total = totalRaw ? parseInt(totalRaw, 10) : 0;
            await AsyncStorage.setItem('totalTicketsEarned', (total + ticketsToAdd).toString());
        } catch { }
        // unlock next level
        unlockNextLevel();
    };

    // Unlock next level in AsyncStorage
    const unlockNextLevel = async () => {
        if (selectedLevel !== null && selectedLevel < LEVELS.length - 1) {
            await AsyncStorage.setItem(`level_${selectedLevel + 1}_completed`, 'true');
            const newUnlocked = [...levelUnlocked];
            newUnlocked[selectedLevel + 1] = true;
            setLevelUnlocked(newUnlocked);
        }
    };

    // Modal for reset
    const ResetModal = () => (
        <FisobvatoryMdl
            visible={modalVisible}
            text={
                "Are you sure you want to\nquit the game?\nYour progress will be lost."
            }
            onYes={async () => {
                setModalVisible(false);
                setSelectedLevel(null);
            }}
            onNo={() => {
                setModalVisible(false);
            }}
        />
    );

    // Level selection screen
    if (selectedLevel === null) {
        return (
            <View style={{ flex: 1, alignItems: 'center', paddingTop: H * 0.019, backgroundColor: 'transparent', }}>
                <ScrollView
                    contentContainerStyle={{
                        alignItems: 'center',
                        paddingBottom: H * 0.21043,
                    }}
                    showsVerticalScrollIndicator={false}
                    style={{ width: '100%' }}
                >
                    {LEVELS.map((lvl, idx) => (
                        <TouchableOpacity
                            onPress={() => setSelectedLevel(idx)}
                            disabled={!levelUnlocked[idx]}
                            key={lvl.name}
                            style={{
                                alignItems: 'center',
                                height: H * 0.111,
                                justifyContent: 'center',
                                marginVertical: H * 0.005,
                                overflow: 'hidden',
                                width: W * 0.6,
                                borderRadius: H * 0.045,
                            }}
                        >
                            <Image source={butnsgrond} style={{
                                position: 'absolute',
                                height: '100%',
                                resizeMode: 'stretch',
                                width: '100%',
                            }}
                            />
                            <Text style={{
                                fontFamily: sihecifntsor.fisansatiBol, fontSize: W * 0.05, color: '#141414',
                                textAlign: 'center',
                            }}>
                                {lvl.name}
                            </Text>
                            <Text style={{
                                fontStyle: 'italic',
                                fontSize: W * 0.035,
                                textAlign: 'center',
                                color: '#141414',
                                fontFamily: sihecifntsor.fisansatiItalic,
                            }}>
                                {`${lvl.count} cards`}
                            </Text>
                            {!levelUnlocked[idx] &&
                                <Image
                                    source={lockIcon}
                                    style={{
                                        resizeMode: 'contain',
                                        position: 'absolute',
                                        height: H * 0.031,
                                        width: H * 0.031,
                                        right: W * 0.059,
                                    }}
                                />
                            }
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        );
    }

    // Result screen (win or lose)
    const ResultScreen = () => {
        const isWin = win === true;
        const ticketsEarned = isWin && selectedLevel !== null ? 5 * (selectedLevel + 1) : 0;
        return (
            <View style={{
                alignItems: 'center',
                backgroundColor: 'transparent',
                paddingTop: H * 0.019,
                flex: 1,
            }}>
                <Image source={isWin ? womanWin : womanLose} style={{
                    height: H * 0.42,
                    marginBottom: H * 0.03,
                    resizeMode: 'contain',
                    width: W * 0.55,
                }}
                />
                <ImageBackground
                    style={{
                        minHeight: H * 0.16,
                        alignItems: 'center',
                        paddingHorizontal: W * 0.05,
                        justifyContent: 'center',
                        paddingVertical: H * 0.025,
                        width: W * 0.9,
                    }}
                    source={elementsGrnd}
                    imageStyle={{ resizeMode: 'stretch', borderRadius: W * 0.04, }}
                >
                    {isWin ? (
                        <>
                            <Text style={{
                                marginBottom: H * 0.01,
                                textAlign: 'center',
                                color: '#141414',
                                fontSize: W * 0.06,
                                fontFamily: sihecifntsor.fisansatiBol,
                            }}>
                                Expedition complete!
                            </Text>
                            <Text style={{
                                fontStyle: 'italic',
                                fontSize: W * 0.045,
                                textAlign: 'center',
                                color: '#141414',
                                marginBottom: H * 0.01,
                                fontFamily: sihecifntsor.fisansatiItalic,
                            }}>
                                Tickets earned:
                            </Text>
                            <View style={{
                                marginTop: H * 0.005,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}>
                                <Image source={ticketIcon} style={{
                                    marginRight: W * 0.02,
                                    height: W * 0.08,
                                    resizeMode: 'contain',
                                    width: W * 0.08,
                                }}
                                />
                                <Text style={{
                                    color: '#141414',
                                    fontSize: W * 0.07,
                                    fontFamily: sihecifntsor.fisansatiBol,
                                }}>
                                    x {ticketsEarned}
                                </Text>
                            </View>
                        </>
                    ) : (
                        <Text style={{
                            color: '#141414',
                            fontFamily: sihecifntsor.fisansatiBol,
                            fontSize: W * 0.05,
                            textAlign: 'center',
                        }}>
                            Unfortunately, you broke all{'\n'}
                            your fishing rods and earned{'\n'}
                            no tickets.
                        </Text>
                    )}
                </ImageBackground>
                <TouchableOpacity
                    onPress={() => setSelectedLevel(null)}
                    style={{
                        borderRadius: H * 0.035,
                        overflow: 'hidden',
                        width: W * 0.5,
                        justifyContent: 'center',
                        marginTop: H * 0.04,
                        alignItems: 'center',
                        height: H * 0.07,
                    }}
                >
                    <Image source={butnsgrond} style={{
                        width: '100%',
                        position: 'absolute',
                        height: '100%',
                        resizeMode: 'stretch',
                    }}
                    />
                    <Text style={{
                        fontSize: W * 0.05,
                        color: '#141414',
                        fontStyle: 'italic',
                        fontFamily: sihecifntsor.fisansatiBol,
                    }}>
                        Back to Levels
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    // Game over or win screen
    if (gameOver) {
        return <ResultScreen />;
    }

    // Fish reveal screen
    if (showFishReveal) {
        return (
            <View style={{
                flex: 1,
                paddingTop: H * 0.019,
                alignItems: 'center',
            }}>
                <View style={{
                    marginBottom: H * 0.03,
                    justifyContent: 'center',
                    flexDirection: 'row',
                }}>
                    {Array(3).fill(0).map((_, i) => (
                        <Image key={i} source={rodIcon}
                            style={{
                                marginHorizontal: W * 0.01,
                                height: W * 0.12,
                                opacity: i < lives ? 1 : 0.3,
                                resizeMode: 'contain',
                                width: W * 0.12,
                            }}
                        />
                    ))}
                </View>
                <View style={{
                    justifyContent: 'center',
                    width: W * 0.9,
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                }}>
                    {shuffledFish.map((num, idx) => (
                        <View key={idx}
                            style={{
                                width: W * 0.22,
                                borderRadius: W * 0.04,
                                backgroundColor: '#eaf6ff',
                                overflow: 'hidden',
                                margin: W * 0.02,
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: W * 0.22,
                            }}
                        >
                            <Image
                                source={numberedfishestocatch[num]}
                                style={{
                                    height: '100%',
                                    resizeMode: 'contain',
                                    width: '100%',
                                }}
                            />
                        </View>
                    ))}
                </View>
            </View>
        );
    }

    // Main game screen
    return (
        <View style={{ paddingTop: H * 0.019, flex: 1, alignItems: 'center', }}>
            <View style={{
                marginBottom: H * 0.03,
                justifyContent: 'center',
                flexDirection: 'row',
            }}>
                {Array(3).fill(0).map((_, i) => (
                    <Image key={i} source={rodIcon} style={{
                        resizeMode: 'contain',
                        height: W * 0.08,
                        opacity: i < lives ? 1 : 0.3,
                        marginHorizontal: W * 0.01,
                        width: W * 0.08,
                    }} />
                ))}
            </View>
            <View style={{
                width: W * 0.9,
                justifyContent: 'center',
                flexWrap: 'wrap',
                flexDirection: 'row',
            }}>
                {shuffledFish.map((num, idx) => (
                    <TouchableOpacity
                        key={idx}
                        onPress={() => handleCardTap(idx)}
                        activeOpacity={0.8}
                        style={{
                            backgroundColor: '#eaf6ff',
                            width: W * 0.22,
                            overflow: 'hidden',
                            margin: W * 0.02,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: W * 0.22,
                            borderRadius: W * 0.04,
                        }}
                    >
                        {cardStates[idx] ? (
                            <Image source={numberedfishestocatch[num]} style={{
                                height: '100%',
                                resizeMode: 'contain',
                                width: '100%',
                            }}
                            />
                        ) : (
                            <Image source={backard} style={{
                                width: '100%',
                                resizeMode: 'contain',
                                height: '100%',
                            }}
                            />
                        )}
                    </TouchableOpacity>
                ))}
            </View>

            {selectedLevel !== null && (
                <TouchableOpacity style={{
                    left: W * 0.04,
                    position: 'absolute',
                    bottom: H * 0.04,
                }}
                    onPress={() => {
                        setModalVisible(true);
                    }}
                >
                    <Image
                        source={require('../IceFishObservatoryAssets/Yoriconesce/arback.png')}
                        style={{
                            height: H * 0.055,
                            resizeMode: 'contain',
                            width: H * 0.055,
                        }}
                    />
                </TouchableOpacity>
            )}
            {/* Modal for reset */}
            <ResetModal />
        </View>
    );
}