import React, { useState as usePolarLatch } from 'react';
import ObsNeedsSomePersonalization from './ObsNeedsSomePersonalization';
import IcearticlesobsShowAll from './IcearticlesobsShowAll';
import Sound from 'react-native-sound';
import CatchFishesInTheIce from './CatchFishesInTheIce';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FitoryGenrlFisce from './FitoryGenrlFisce';
import {
    SafeAreaView as CryoSafePane,
    Image as ToriceImagicatory,
    ImageBackground as PolarBackdropLayer,
    TouchableOpacity as GlacierTapNode,
    Dimensions as FrostWindowGauge,
    View as FiceViewsh,
} from 'react-native';

type ObserFishNode =
    | 'Arcerell-home-gener'
    | 'Tieller Sun Achievsmark'
    | 'Private Ice Articles For Tickets'
    | 'Winter Catching Fishes In The Ice'
    | 'Fish Observatory Needs Some Personalization';

const frostMetrics = FrostWindowGauge.get('window');
const ICE_VIEW_H = frostMetrics.height;
const ICE_VIEW_W = frostMetrics.width;

const cryoNavGlyphs = [
    {
        node: 'Arcerell-home-gener',
        icon: require('../IceFishObservatoryAssets/Yoriconesce/buildingStation.png'),
    },
    {
        node: 'Winter Catching Fishes In The Ice',
        icon: require('../IceFishObservatoryAssets/Yoriconesce/playNowGame.png'),
    },
    {
        node: 'Private Ice Articles For Tickets',
        icon: require('../IceFishObservatoryAssets/Yoriconesce/maybeArticles.png'),
    },
    {
        node: 'Fish Observatory Needs Some Personalization',
        icon: require('../IceFishObservatoryAssets/Yoriconesce/tablersets.png'),
    },
];

const ICE_AUDIO_FLAG = 'teller-marcur-music-flag';
const ICE_AUDIO_LOOP = 'coldArcticAmbient.mp3';

let arcticLoopHandle: Sound | null = null;

const OsertishWrapIcingCatch: React.FC = () => {
    const [activeIceNode, setActiveIceNode] =
        usePolarLatch<ObserFishNode>('Arcerell-home-gener');
    const [auroraSoundGate, setAuroraSoundGate] =
        usePolarLatch<boolean | null>(null);

    React.useEffect(() => {
        (async () => {
            const stored = await AsyncStorage.getItem(ICE_AUDIO_FLAG);
            if (stored === null) {
                await AsyncStorage.setItem(ICE_AUDIO_FLAG, 'true');
                setAuroraSoundGate(true);
            } else {
                setAuroraSoundGate(stored === 'true');
            }
        })();
    }, []);

    React.useEffect(() => {
        if (auroraSoundGate === null) return;

        if (arcticLoopHandle) {
            arcticLoopHandle.stop(() => {
                arcticLoopHandle?.release();
                arcticLoopHandle = null;
            });
        }

        if (auroraSoundGate) {
            Sound.setCategory('Playback');
            arcticLoopHandle = new Sound(
                ICE_AUDIO_LOOP,
                Sound.MAIN_BUNDLE,
                error => {
                    if (!error && arcticLoopHandle) {
                        arcticLoopHandle.setNumberOfLoops(-1);
                        arcticLoopHandle.play();
                    }
                }
            );
        }

        return () => {
            if (arcticLoopHandle) {
                arcticLoopHandle.stop(() => {
                    arcticLoopHandle?.release();
                    arcticLoopHandle = null;
                });
            }
        };
    }, [auroraSoundGate]);

    const flipAuroraGate = async () => {
        const next = !auroraSoundGate;
        setAuroraSoundGate(next);
        await AsyncStorage.setItem(ICE_AUDIO_FLAG, next ? 'true' : 'false');
    };

    const renderIceSector = (node: ObserFishNode) => {
        switch (node) {
            case 'Arcerell-home-gener':
                return <FitoryGenrlFisce />;
            case 'Fish Observatory Needs Some Personalization':
                return (
                    <ObsNeedsSomePersonalization
                        toggleAudioGate={flipAuroraGate}
                        audioGate={auroraSoundGate}
                    />
                );
            case 'Private Ice Articles For Tickets':
                return <IcearticlesobsShowAll />;
            case 'Winter Catching Fishes In The Ice':
                return <CatchFishesInTheIce />;
            default:
                return null;
        }
    };

    const iceBarBackdrop = require('../IceFishObservatoryAssets/IsoberImagis/bottomBarBg.png');

    return (
        <FiceViewsh style={{
            height: ICE_VIEW_H,
            width: ICE_VIEW_W,
            flex: 1,
            backgroundColor: '#0F3D66',
        }}
        >
            <ToriceImagicatory
                style={{
                    width: ICE_VIEW_W,
                    position: 'absolute',
                    height: ICE_VIEW_H,
                }}
                source={require('../IceFishObservatoryAssets/IsoberImagis/obsIcesfone.png')}
                resizeMode="cover"
            />
            <ToriceImagicatory
                style={{
                    height: ICE_VIEW_H * 1.06,
                    position: 'absolute',
                    width: ICE_VIEW_W,
                }}
                source={require('../IceFishObservatoryAssets/IsoberImagis/Snow.gif')}
                resizeMode="cover"
            />

            <CryoSafePane />

            {renderIceSector(activeIceNode)}

            <FiceViewsh style={{
                    height: ICE_VIEW_H * 0.13,
                    position: 'absolute',
                    justifyContent: 'center',
                    bottom: 0,
                    alignItems: 'center',
                    width: ICE_VIEW_W,
                }}
            >
                <PolarBackdropLayer
                    style={{
                        justifyContent: 'space-around',
                        height: ICE_VIEW_H * 0.1,
                        paddingHorizontal: ICE_VIEW_W * 0.04,
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: ICE_VIEW_W * 0.64,
                    }}
                    imageStyle={{
                        borderRadius: ICE_VIEW_W * 0.08,
                        resizeMode: 'stretch',
                    }}
                    source={iceBarBackdrop}
                >
                    {cryoNavGlyphs.map((glyph, idx) => (
                        <GlacierTapNode
                            key={idx}
                            onPress={() =>
                                setActiveIceNode(glyph.node as ObserFishNode)
                            }
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <ToriceImagicatory
                                source={glyph.icon}
                                resizeMode="contain"
                                style={{
                                    width: ICE_VIEW_H * 0.037,
                                    height: ICE_VIEW_H * 0.037,
                                    tintColor:
                                        activeIceNode === glyph.node
                                            ? '#141414'
                                            : 'white',
                                    bottom: ICE_VIEW_H * 0.003,
                                }}
                            />
                        </GlacierTapNode>
                    ))}
                </PolarBackdropLayer>
            </FiceViewsh>
        </FiceViewsh>
    );
};

export default OsertishWrapIcingCatch;