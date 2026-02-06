import { sihecifntsor } from '../sihecifntsor';
import React, { useEffect as useServaffct, useState as useShifStat } from 'react';
import FisobvatoryMdl from '../ServatorComopnetos/FisobvatoryMdl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    TouchableOpacity as Tapish,
    View as Layviewrva,
    Image as Svatrimag,
    Text as Shiobtextory,
    Image as Varseimg,
    Dimensions as Obimens,
} from 'react-native';

// Шляхи до фото елементів (замініть на свої)
const helicopterImgs = [
    require('../IceFishObservatoryAssets/IsoberImagis/homestates/gvyntokr/heli1.png'),
    require('../IceFishObservatoryAssets/IsoberImagis/homestates/gvyntokr/UpgratedFor1.png'),
    require('../IceFishObservatoryAssets/IsoberImagis/homestates/gvyntokr/Thirdgvnt.png'),
    require('../IceFishObservatoryAssets/IsoberImagis/homestates/gvyntokr/TheBestHeliEver.png'),
];
const baseImgs = [
    require('../IceFishObservatoryAssets/IsoberImagis/homestates/bases/openedFirst.png'),
    require('../IceFishObservatoryAssets/IsoberImagis/homestates/bases/morePowerful.png'),
    require('../IceFishObservatoryAssets/IsoberImagis/homestates/bases/thecoolestbase.png'),
];
const craneImgs = [
    require('../IceFishObservatoryAssets/IsoberImagis/homestates/krans/simplekran.png'),
    require('../IceFishObservatoryAssets/IsoberImagis/homestates/krans/machinecarkrn.png'),
    require('../IceFishObservatoryAssets/IsoberImagis/homestates/krans/betterThanPrevKran.png'),
    require('../IceFishObservatoryAssets/IsoberImagis/homestates/krans/lastUpgradedKran.png'),
];
const buttonBgImg = require('../IceFishObservatoryAssets/IsoberImagis/butnsgrond.png');
const ticketImg = require('../IceFishObservatoryAssets/IsoberImagis/obserticket.png');
const smokeGif = require('../IceFishObservatoryAssets/IsoberImagis/Smoke.gif');

const UPGRADE_START_PRICE = 20;

function getUpgradePrice(level: number) {
    return UPGRADE_START_PRICE * Math.pow(2, level);
}

export default function FitoryGenrlFisce() {
    const [modalVisible, setModalVisible] = useShifStat(false);
    const [heliLevel, setHeliLevel] = useShifStat(0);
    const [tickets, setTickets] = useShifStat(0);
    const [baseLevel, setBaseLevel] = useShifStat(0);
    const { width: sertor_With, height: sertor_Hei } = Obimens.get('window');
    const [craneLevel, setCraneLevel] = useShifStat(0);
    const [modalUpgrade, setModalUpgrade] = useShifStat<null | {
        key: string,
        level: number,
        setLevel: (v: number) => void,
        maxLevel: number,
    }>(null);
    const [animatingUpgrade, setAnimatingUpgrade] = useShifStat<null | string>(null);

    // Завантаження квитків
    useServaffct(() => {
        AsyncStorage.getItem('tickets').then(val => setTickets(val ? parseInt(val) : 0));
        AsyncStorage.getItem('heliLevel').then(val => setHeliLevel(val ? parseInt(val) : 0));
        AsyncStorage.getItem('baseLevel').then(val => setBaseLevel(val ? parseInt(val) : 0));
        AsyncStorage.getItem('craneLevel').then(val => setCraneLevel(val ? parseInt(val) : 0));
    }, []);

    const upgrades = [
        {
            key: 'heli',
            imgs: helicopterImgs,
            level: heliLevel,
            setLevel: setHeliLevel,
            maxLevel: 3,
            style: {
                position: 'absolute',
                top: sertor_Hei * 0.111,
                alignSelf: 'flex-end',
                alignItems: 'center',
            },
            imgStyle: {
                width: sertor_With * 0.43,
                height: sertor_With * 0.43 * 0.64,
                resizeMode: 'contain',
                marginBottom: sertor_Hei * 0.04 * 0.7,
            },
            btnStyle: {
                marginBottom: sertor_Hei * 0.04 * 0.6,
            },
            btnText: "Upgrade for {price} \nUnlock new level",
        },
        {
            key: 'base',
            imgs: baseImgs,
            level: baseLevel,
            setLevel: setBaseLevel,
            maxLevel: 2,
            style: {
                position: 'absolute',
                top: sertor_Hei * 0.3,
                alignSelf: 'flex-start',
                alignItems: 'center',
                left: -sertor_With * 0.28,
            },
            imgStyle: {
                width: sertor_With * 0.88,
                height: sertor_Hei * 0.21,
                resizeMode: 'contain',
                marginBottom: sertor_Hei * 0.04 * 0.7,
            },
            btnStyle: {
                marginBottom: sertor_Hei * 0.04 * 0.6,
                marginLeft: sertor_With * 0.21,
                marginTop: -sertor_Hei * 0.04,
            },
            btnText: "Upgrade for {price} \nUnlock new level",
        },
        {
            key: 'crane',
            imgs: craneImgs,
            level: craneLevel,
            setLevel: setCraneLevel,
            maxLevel: 3,
            style: {
                position: 'absolute',
                top: sertor_Hei * 0.4,
                alignSelf: 'flex-start',
                alignItems: 'center',
                right: -sertor_With * 0.28,
            },
            imgStyle: {
                width: sertor_With * 0.8,
                height: sertor_Hei * 0.25,
                resizeMode: 'contain',
                marginBottom: sertor_Hei * 0.04 * 0.7,
            },
            btnStyle: {
                marginBottom: sertor_Hei * 0.04 * 0.6,
                marginRight: sertor_With * 0.21,
            },
            btnText: "Upgrade for {price} \nUnlock new level",
        },
    ];

    const btnWidth = sertor_With * 0.35;
    const btnHeight = sertor_Hei * 0.07;
    const btnRadius = btnHeight * 0.5;
    const ticketIconSize = sertor_Hei * 0.032;

    // Оновлення квитків та рівнів
    const handleUpgrade = async (type: string, level: number, setLevel: (v: number) => void, maxLevel: number) => {
        const price = getUpgradePrice(level);
        if (tickets >= price && level < maxLevel + 1) {
            const newTickets = tickets - price;
            setTickets(newTickets);
            AsyncStorage.setItem('tickets', newTickets.toString());
            setLevel(level + 1);
            AsyncStorage.setItem(type + 'Level', (level + 1).toString());
        }
    };

    // Оновлення квитків та рівнів з анімацією
    const handleUpgradeWithAnimation = async (
        type: string,
        level: number,
        setLevel: (v: number) => void,
        maxLevel: number
    ) => {
        setAnimatingUpgrade(type);
        // Тривалість гіфки (ms)
        await new Promise(res => setTimeout(res, 1100));
        await handleUpgrade(type, level, setLevel, maxLevel);
        setAnimatingUpgrade(null);
    };

    return (
        <Layviewrva style={{
            alignItems: 'center',
            flex: 1,
            paddingTop: sertor_Hei * 0.019,
            backgroundColor: 'transparent',
        }}>
            {/* Верхній рядок з квитками */}
            <Layviewrva style={{
                marginBottom: sertor_Hei * 0.03,
                alignItems: 'center',
                flexDirection: 'row',
            }}>
                <Varseimg
                    source={ticketImg}
                    style={{
                        marginRight: sertor_With * 0.01,
                        width: ticketIconSize,
                        resizeMode: 'contain',
                        height: ticketIconSize,
                    }}
                />
                <Shiobtextory style={{
                    fontSize: sertor_Hei * 0.032,
                    color: '#141414',
                    fontFamily: sihecifntsor.fisansatiBol,
                }}>
                    X {tickets}
                </Shiobtextory>
            </Layviewrva>

            {/* Апгрейди */}
            {upgrades.map(upg => {
                const upgradePrice = getUpgradePrice(upg.level);
                const canUpgrade = tickets >= upgradePrice && upg.level < upg.maxLevel;
                // визначаємо попередній рівень для гіфки
                const prevLevel = upg.level > 0 ? upg.level - 1 : 0;
                return (
                    <Layviewrva key={upg.key} style={upg.style}>
                        {/* Якщо апгрейдиться - показати попереднє фото + гіфку поверх нового */}
                        {animatingUpgrade === upg.key && (
                            <>
                                <Varseimg
                                    source={upg.imgs[prevLevel]}
                                    style={{
                                        ...upg.imgStyle,
                                        position: 'absolute',
                                        zIndex: 11,
                                        left: 0,
                                        top: 0,
                                    }}
                                />
                                <Svatrimag
                                    source={smokeGif}
                                    style={{
                                        position: 'absolute',
                                        zIndex: 12,
                                        width: upg.imgStyle.width,
                                        height: upg.imgStyle.height,
                                        left: 0,
                                        top: 0,
                                    }}
                                    resizeMode="contain"
                                />
                            </>
                        )}
                        {/* Зображення елемента (новий рівень) */}
                        <Varseimg
                            source={upg.imgs[upg.level]}
                            style={{
                                ...upg.imgStyle,
                                // не ховаємо новий рівень, просто поверх нього малюємо старий+smoke якщо треба
                            }}
                        />
                        {/* Кнопка апгрейду */}
                        <Tapish
                            activeOpacity={0.7}
                            onPress={() => {
                                if (canUpgrade) {
                                    setModalUpgrade({
                                        key: upg.key,
                                        level: upg.level,
                                        setLevel: upg.setLevel,
                                        maxLevel: upg.maxLevel,
                                    });
                                    setModalVisible(true);
                                }
                            }}
                            disabled={!canUpgrade}
                            style={{
                                width: btnWidth,
                                height: btnHeight,
                                borderRadius: btnRadius,
                                overflow: 'hidden',
                                opacity: canUpgrade ? 1 : 0.5,
                                ...upg.btnStyle,
                            }}
                        >
                            <Varseimg
                                source={buttonBgImg}
                                style={{
                                    position: 'absolute',
                                    width: btnWidth,
                                    height: btnHeight,
                                    resizeMode: 'stretch',
                                }}
                            />
                            <Shiobtextory style={{
                                fontStyle: 'italic',
                                fontSize: sertor_With * 0.035,
                                fontFamily: sihecifntsor.fisansatiItalic,
                                marginTop: btnHeight * 0.18,
                                fontWeight: '600',
                                textAlign: 'center',
                                color: '#141414',
                            }}>
                                {`Upgrade for ${upgradePrice} \nUnlock new level`}
                            </Shiobtextory>
                        </Tapish>
                    </Layviewrva>
                );
            })}

            {/* Модалка підтвердження */}
            <FisobvatoryMdl
                visible={modalVisible}
                text={
                    "Are you sure you want to\nupgrade this item?\nThis action cannot be\nundone."
                }
                onYes={async () => {
                    if (modalUpgrade) {
                        setModalVisible(false);
                        await handleUpgradeWithAnimation(
                            modalUpgrade.key,
                            modalUpgrade.level,
                            modalUpgrade.setLevel,
                            modalUpgrade.maxLevel
                        );
                        setModalUpgrade(null);
                    } else {
                        setModalVisible(false);
                        setModalUpgrade(null);
                    }
                }}
                onNo={() => {
                    setModalVisible(false);
                    setModalUpgrade(null);
                }}
            />
        </Layviewrva>
    );
}