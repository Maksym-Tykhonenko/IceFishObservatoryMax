import { sihecifntsor } from '../sihecifntsor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState as useFlipLatch } from 'react';
import obsarticles from '../Sevartdata/obsarticles';
import {
    Share,
    Dimensions as Servadms,
    Text as Torestex,
    ScrollView as EcifobSwapSone,
    View as Arcticiew,
    TouchableOpacity as ZnoTachTp,
    ImageBackground,
    Image as Shiobimag,
} from 'react-native';

const ticketIcon = require('../IceFishObservatoryAssets/IsoberImagis/obserticket.png');
const playIcon = require('../IceFishObservatoryAssets/IsoberImagis/nexbtn.png');
const shareIcon = require('../IceFishObservatoryAssets/Yoriconesce/vatosharing.png');
const backaro = require('../IceFishObservatoryAssets/Yoriconesce/arback.png');
const lockIcon = require('../IceFishObservatoryAssets/IsoberImagis/filovack.png');
const elementsGrnd = require('../IceFishObservatoryAssets/IsoberImagis/elementsGrnd.png');

export default function IcearticlesobsShowAll() {
    const { width: obsishW, height: obsishH } = Servadms.get('window');
    const [totalTickets, setTotalTickets] = useFlipLatch(0);
    const [openedArticle, setOpenedArticle] = useFlipLatch(null);

    useEffect(() => {
        AsyncStorage.getItem('totalTicketsEarned').then(val => {
            setTotalTickets(Number(val) || 0);
        });
    }, []);

    const unlockThresholds = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500];

    // Детальний вигляд артикля
    if (openedArticle) {
        const [titleMain, titleSub] = openedArticle.title.split(' — ');
        return (
            <Arcticiew style={{
                backgroundColor: 'transparent',
                alignItems: 'center',
                flex: 1,
                paddingTop: obsishH * 0.04,
            }}>
                <EcifobSwapSone
                    style={{
                        width: '90%',
                        alignSelf: 'center',
                        marginBottom: obsishH * 0.02,
                    }}
                    contentContainerStyle={{
                        paddingBottom: obsishH * 0.19034,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <Shiobimag
                        source={openedArticle.image}
                        style={{
                            resizeMode: 'cover',

                            marginTop: obsishH * 0.01,

                            width: obsishW * 0.5,

                            borderRadius: obsishW * 0.06,
                            height: obsishW * 0.5,

                            alignSelf: 'center',

                            marginBottom: obsishH * 0.03,
                        }}
                    />
                    <Torestex style={{
                        marginBottom: obsishH * 0.01,
                        fontSize: obsishW * 0.075,
                        fontFamily: sihecifntsor.fisansatiBol,
                        color: '#141414',
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}>
                        {titleMain}
                    </Torestex>
                    <Torestex style={{
                        fontFamily: sihecifntsor.fisansatiBol,
                        textAlign: 'center',
                        fontSize: obsishW * 0.048,
                        marginBottom: obsishH * 0.025,
                        color: '#141414',
                    }}>
                        {titleSub}
                    </Torestex>

                    <Torestex style={{
                        textShadowOffset: { width: 0, height: 1 },
                        color: '#141414',
                        textShadowRadius: 2,
                        fontFamily: sihecifntsor.fisansatiBol,
                        lineHeight: obsishH * 0.032,
                        textAlign: 'left',
                        fontSize: obsishW * 0.042,
                        textShadowColor: 'rgba(255,255,255,0.7)',
                    }}>
                        {openedArticle.text}
                    </Torestex>
                </EcifobSwapSone>

                <Arcticiew style={{
                    justifyContent: 'space-between',
                    position: 'absolute',
                    flexDirection: 'row',
                    alignSelf: 'center',
                    bottom: obsishH * 0.04,
                    width: '93%',
                }}>
                    <ZnoTachTp
                        style={{
                        }}
                        onPress={() => {
                            setOpenedArticle(null);
                        }}
                    >
                        <Shiobimag source={backaro} style={{
                            height: obsishH * 0.055,
                            resizeMode: 'contain',
                            width: obsishH * 0.055,
                        }}
                        />
                    </ZnoTachTp>

                    <ZnoTachTp
                        onPress={() => {
                            Share.share({
                                message: `${openedArticle.title}\n\n${openedArticle.text}`,
                            })
                        }}
                    >
                        <Shiobimag
                            source={shareIcon}
                            style={{
                                resizeMode: 'contain',
                                height: obsishH * 0.055,
                                width: obsishH * 0.055,
                            }}
                        />
                    </ZnoTachTp>
                </Arcticiew>
            </Arcticiew>
        );
    }

    return (
        <Arcticiew style={{
            paddingTop: obsishH * 0.019,

            backgroundColor: 'transparent',

            flex: 1,

            alignItems: 'center',

        }}>
            {/* Tickets header */}
            <Torestex style={{
                textAlign: 'center',
                marginBottom: obsishH * 0.025,
                fontFamily: sihecifntsor.fisansatiBol,
                color: '#111',
                fontSize: obsishW * 0.07,
                fontWeight: 'bold',
            }}>
                Total Tickets:{" "}
                <Shiobimag
                    source={ticketIcon}
                    style={{
                        height: obsishW * 0.07,
                        resizeMode: 'contain',
                        width: obsishW * 0.07,
                    }}
                />{" "}
                X {totalTickets}
            </Torestex>

            <EcifobSwapSone
                style={{ width: '100%' }}
                contentContainerStyle={{
                    alignItems: 'center',
                    paddingBottom: obsishH * 0.1704350823,
                }}
                showsVerticalScrollIndicator={false}
            >
                {obsarticles.map((art, idx) => {
                    const unlocked = totalTickets >= unlockThresholds[idx];
                    return (
                        <ImageBackground
                            key={art.id}
                            source={elementsGrnd}
                            style={{
                                borderWidth: 2,
                                alignItems: 'center',
                                height: obsishH * 0.19,
                                borderColor: '#aef6ff',
                                marginBottom: obsishH * 0.025,
                                overflow: 'hidden',
                                padding: obsishW * 0.035,
                                width: obsishW * 0.88,
                                borderRadius: obsishW * 0.04,
                                paddingHorizontal: obsishW * 0.05,
                                flexDirection: 'row',
                            }}
                            imageStyle={{
                                borderRadius: obsishW * 0.04,
                                resizeMode: 'stretch',
                            }}
                        >
                            {/* Article image */}
                            <Shiobimag source={art.image}
                                style={{
                                    borderColor: '#e0f7fa',
                                    borderRadius: obsishW * 0.025,
                                    marginRight: obsishW * 0.04,
                                    width: obsishW * 0.22,
                                    borderWidth: 2,
                                    height: obsishW * 0.22,
                                }}
                            />
                            {/* Article content */}
                            <Arcticiew style={{ flex: 1, height: '100%', justifyContent: 'center' }}>
                                <Torestex numberOfLines={1} style={{
                                    fontFamily: sihecifntsor.fisansatiBol,
                                    fontWeight: 'bold',
                                    color: '#141414',
                                    fontSize: obsishW * 0.052,
                                    marginBottom: obsishH * 0.008,
                                }}
                                >
                                    {art.title.split(' — ')[0]}
                                </Torestex>
                                <Torestex numberOfLines={2} style={{
                                    fontFamily: sihecifntsor.fisansatiBol,
                                    fontSize: obsishW * 0.038,
                                    marginBottom: obsishH * 0.012,
                                    color: '#141414',
                                }}
                                >
                                    {unlocked
                                        ? (art.title.split(' — ')[1] || '')
                                        : `Earn ${unlockThresholds[idx]} total tickets to unlock`}
                                </Torestex>
                                {/* Action buttons */}
                                <Arcticiew style={{
                                    marginTop: obsishH * 0.005,
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                }}>
                                    {unlocked ? (
                                        <>
                                            <ZnoTachTp
                                                style={{
                                                    marginRight: obsishW * 0.03,
                                                }}
                                                onPress={() => setOpenedArticle(art)}
                                            >
                                                <Shiobimag
                                                    source={playIcon}
                                                    style={{
                                                        resizeMode: 'contain',
                                                        height: obsishH * 0.055,
                                                        width: obsishW * 0.16,
                                                    }}
                                                />
                                            </ZnoTachTp>
                                            <ZnoTachTp
                                                onPress={() => {
                                                    Share.share({
                                                        message: `${art.title}\n\n${art.text}`,
                                                    });
                                                }}
                                            >
                                                <Shiobimag source={shareIcon}
                                                    style={{
                                                        height: obsishH * 0.055,
                                                        resizeMode: 'contain',
                                                        width: obsishH * 0.055,
                                                    }}
                                                />
                                            </ZnoTachTp>
                                        </>
                                    ) : (
                                        <Arcticiew>
                                            <Shiobimag
                                                style={{
                                                    resizeMode: 'contain',
                                                    height: obsishH * 0.04,
                                                    alignSelf: 'center',
                                                    width: obsishH * 0.04,
                                                }}
                                                source={lockIcon}
                                            />
                                        </Arcticiew>
                                    )}
                                </Arcticiew>
                            </Arcticiew>
                        </ImageBackground>
                    );
                })}
            </EcifobSwapSone>
        </Arcticiew>
    );
}