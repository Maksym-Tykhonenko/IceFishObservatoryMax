import {
    Share as BorealShareGate,
    Image as ToriceImagicatory,
    View as FrostLytPane,
    TouchableOpacity as GlacierPressNode,
    Dimensions as PolarGaugeKit,
    Text as Servtextory,
    Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sihecifntsor } from '../sihecifntsor';
import FisobvatoryMdl from '../ServatorComopnetos/FisobvatoryMdl';
import { useNavigation as useNavDrift } from '@react-navigation/native';
import React, { useState as useShardLatch } from 'react';

// icon bindings (unchanged paths)
const wrenchExplorerFig = require('../IceFishObservatoryAssets/IsoberImagis/girl_wrench.png');
const auroraMusicOff = require('../IceFishObservatoryAssets/Yoriconesce/toryfimuscoff.png');
const auroraMusicOn = require('../IceFishObservatoryAssets/Yoriconesce/semusicOn.png');
const cryoResetSeal = require('../IceFishObservatoryAssets/Yoriconesce/servaresetApp.png');
const frostShareGlyph = require('../IceFishObservatoryAssets/Yoriconesce/vatosharing.png');


const arcticName = Platform.OS === 'android' ? 'Arctic Station Ice Fish Memory' : 'Polar Ice Fish Observatory';

export default function ObsNeedsSomePersonalization({
    toggleAudioGate,
    audioGate,
}: {
    toggleAudioGate: () => void;
    audioGate: boolean | null;
}) {
    const { width: iceSpanW, height: iceSpanH } =
        PolarGaugeKit.get('window');

    const [resetSealVisible, setResetSealVisible] =
        useShardLatch(false);

    const navTunnel = useNavDrift();

    const polarMenuGrid = [
        {
            label: Platform.OS === 'android' ? 'Vibration' : 'Music',
            icon: audioGate ? auroraMusicOn : auroraMusicOff,
            onPress: toggleAudioGate,
        },
        {
            label: 'Reset Progress',
            icon: cryoResetSeal,
            onPress: () => setResetSealVisible(true),
        },
        {
            label: 'Share App',
            icon: frostShareGlyph,
            onPress: () => {
                BorealShareGate.share({
                    message:
                        `Explore frozen waters with ${arcticName}. Share the Arctic mystery with friends and dive into discovery together!`,
                });
            },
        },
    ];

    return (
        <FrostLytPane style={{
            paddingTop: iceSpanH * 0.07,
            backgroundColor: 'transparent',
            flex: 1,
            alignItems: 'center',
        }}>
            {/* control list */}
            <FrostLytPane      style={{
                    marginBottom: iceSpanH * 0.08,
                    width: iceSpanW * 0.88,
                }}
            >
                {polarMenuGrid.map((unit, idx) => (
                    <FrostLytPane
                        key={unit.label}    style={{
                            alignItems: 'center',
                            marginBottom: iceSpanH * 0.019,
                            flexDirection: 'row',
                        }}
                    >
                        <Servtextory style={{fontSize: iceSpanW * 0.059, color: '#111',flex: 1,
                                fontFamily:
                                    sihecifntsor.fisansatiBol,
                            }}
                        >
                            {unit.label}
                        </Servtextory>

                        <GlacierPressNode
                            onPress={unit.onPress}
                            style={{
                                borderRadius: iceSpanW * 0.09,
                                alignItems: 'center',
                                width: iceSpanW * 0.11,
                                height: iceSpanW * 0.11,
                                overflow: 'hidden',
                                justifyContent: 'center',
                                marginLeft: iceSpanW * 0.04,
                            }}
                        >
                            <ToriceImagicatory source={unit.icon}
                                style={{
                                    resizeMode: 'contain',
                                    height: iceSpanW * 0.11,
                                    width: iceSpanW * 0.11,
                                }}
                            />
                        </GlacierPressNode>
                    </FrostLytPane>
                ))}
            </FrostLytPane>

            {/* arctic character */}
            <ToriceImagicatory
                source={wrenchExplorerFig}
                style={{
                    resizeMode: 'contain',
                    position: 'absolute',
                    height: iceSpanH * 0.48,
                    alignSelf: 'center',
                    bottom: iceSpanH * 0.14,
                    width: iceSpanW * 0.61,
                }}
            />

            {/* reset confirmation */}
            <FisobvatoryMdl
                visible={resetSealVisible}
                text={
                    'Are you sure you want to\nreset the Progress?\nThis action cannot be\nundone.'
                }
                onYes={async () => {
                    setResetSealVisible(false);
                    setTimeout(() => {
                        AsyncStorage.clear();
                        navTunnel.replace(
                            'IceFishObservatoryLoading'
                        );
                    }, 500);
                }}
                onNo={() => {
                    setResetSealVisible(false);
                }}
            />
        </FrostLytPane>
    );
}