const ICEFISH_ONBOARD_SIGIL = 'tocks-tiks-onb-fish-serv-0324-432-45322-543';
import React, { useState as useFishStepPulse } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Image as CryoVisualPlate,
    View as IceObservaFrame,
    TouchableOpacity as FishTapEmitter,
    useWindowDimensions as ObserViewGauge,
} from 'react-native';
import { useNavigation as IceRouteCurrent } from '@react-navigation/native';

const IceFishObservatoryOnboarding: React.FC = () => {
    const [iceSlideCursor, setIceSlideCursor] = useFishStepPulse(0);
    const routeCurrent = IceRouteCurrent();

    const obserFishSlides = [
        require('../IceFishObservatoryAssets/IsoberImagis/fisobsFrstimgs/Welorbatoish.png'),
        require('../IceFishObservatoryAssets/IsoberImagis/fisobsFrstimgs/AttentionsChallenges.png'),
        require('../IceFishObservatoryAssets/IsoberImagis/fisobsFrstimgs/StationUpgrades.png'),
        require('../IceFishObservatoryAssets/IsoberImagis/fisobsFrstimgs/ArcticKnowledge.png'),
    ];

    const { width: sservIceW, height: sservIceH } = ObserViewGauge();

    const driftToNextPane = async () => {
        if (iceSlideCursor < obserFishSlides.length - 1) {
            setIceSlideCursor(prev => prev + 1);
        } else {
            try {
                await AsyncStorage.setItem(ICEFISH_ONBOARD_SIGIL, 'complete');
            } catch (polarCacheFracture) {
                if (__DEV__) console.warn('IceFish::onboard-freeze', polarCacheFracture);
            }
            routeCurrent.replace?.('OsertishWrapIcingCatch');
        }
    };

    const activeCryoSlide = obserFishSlides[iceSlideCursor];

    return (
        <IceObservaFrame
            style={{
                width: sservIceW,
                justifyContent: 'flex-end',
                alignItems: 'center',
                flex: 1,
                height: sservIceH,
            }}
        >
            {/* arctic base layer */}
            <CryoVisualPlate
                resizeMode="cover"
                style={{
                    position: 'absolute',
                    left: 0,
                    height: sservIceH,
                    width: sservIceW,
                    top: 0,
                }}
                source={require('../IceFishObservatoryAssets/IsoberImagis/obsIcesfone.png')}
            />

            {/* dynamic observatory slide */}
            <CryoVisualPlate
                resizeMode="contain"
                source={activeCryoSlide}
                style={{
                    alignSelf: 'center',
                    top: sservIceH * 0.1,
                    height: sservIceH * 0.7,
                    width: sservIceW * 0.95,
                    position: 'absolute',
                }}
            />

            {/* forward current */}
            <FishTapEmitter
                activeOpacity={0.9}
                style={{
                    bottom: sservIceH * 0.05,
                    position: 'absolute',
                    alignSelf: 'center',
                }}
                onPress={driftToNextPane}
            >
                <CryoVisualPlate
                    resizeMode="contain"
                    source={require('../IceFishObservatoryAssets/IsoberImagis/nexbtn.png')}
                    style={{
                        height: sservIceH * 0.07,
                        width: sservIceW * 0.3,
                    }}
                />
            </FishTapEmitter>
        </IceObservaFrame>
    );
};

export default IceFishObservatoryOnboarding;