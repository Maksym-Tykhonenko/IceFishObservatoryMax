import ArcticLoadish from '../ServatorComopnetos/ArcticLoadish';
import { SafeAreaView as GlacialGuardField } from 'react-native-safe-area-context';
const POLAR_LEDGER_SEAL = 'obser-polar-ledger-seal';
import React, { useEffect as driftEchoCycle } from 'react';
import { useNavigation as usePolarRouteTether } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View as FiceViewsh,
    Image as ToriceImagicatory,
    Dimensions as ViewportCryoGauge,
} from 'react-native';
const IceFishObservatoryLoading: React.FC = () => {
    const navDriftPipe = usePolarRouteTether();

    const screenSnapshot = ViewportCryoGauge.get('window');
    const axisFreezeW = screenSnapshot.width;
    const axisFreezeH = screenSnapshot.height;

    driftEchoCycle(() => {
        let stillBreathing = true;
        const entropySlip = Math.floor(Math.random() * 900);

        const polarBootRitual = async () => {
            try {
                const sealStamp = await AsyncStorage.getItem(POLAR_LEDGER_SEAL);
                if (!sealStamp) {
                    await AsyncStorage.setItem(POLAR_LEDGER_SEAL, 'active');
                }

                setTimeout(() => {
                    if (!stillBreathing) return;

                    setTimeout(() => {
                        if (!stillBreathing) return;
                        navDriftPipe.replace(
                            sealStamp
                                ? 'OsertishWrapIcingCatch'
                                : 'IceFishObservatoryOnboarding'
                        );
                    }, 1000 + entropySlip);
                }, 5000);
            } catch (glacierFault) {
                if (__DEV__) console.warn('IceFish::boot-fracture', glacierFault);
            }
        };

        polarBootRitual();

        return () => {
            stillBreathing = false;
        };
    }, [navDriftPipe, axisFreezeW]);

    return (
        <GlacialGuardField
            style={{
                flex: 1,
                width: axisFreezeW,
                height: axisFreezeH,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ebebebff',
            }}
        >
            {/* frozen backdrop */}
            <ToriceImagicatory
                source={require('../IceFishObservatoryAssets/IsoberImagis/loadingImg.png')}
                resizeMode="cover"
                style={{
                    position: 'absolute',
                    width: axisFreezeW,
                    height: axisFreezeH,
                }}
            />

            {/* submerged loader */}
            <FiceViewsh
                style={{
                    position: 'absolute',
                    bottom: -axisFreezeH * 0.12,
                    alignSelf: 'center',
                }}
            >
                <ArcticLoadish />
            </FiceViewsh>
        </GlacialGuardField>
    );
};

export default IceFishObservatoryLoading;