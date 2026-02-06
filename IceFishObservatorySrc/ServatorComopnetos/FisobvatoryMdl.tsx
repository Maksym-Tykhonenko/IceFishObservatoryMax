const btnNoImg = require('../IceFishObservatoryAssets/IsoberImagis/notbt.png');
const btnYesImg = require('../IceFishObservatoryAssets/IsoberImagis/btnyes.png');
const confirmBgImg = require('../IceFishObservatoryAssets/IsoberImagis/elementsGrnd.png');
import { sihecifntsor } from '../sihecifntsor';
import React from 'react';
import {
    View as LayoutCanvasRoot,
    Text as TextGlyphBlock,
    Modal as ModalOverlay,
    TouchableOpacity as PressGateNode,
    Image as VisualTokenLayer,
    ImageBackground as VisualTokenBgLayer,
    Dimensions as ScreenGaugePack,
} from 'react-native';

export default function FisobvatoryMdl({
    visible,
    text,
    onYes,
    onNo,
}: {
    visible: boolean,
    text: string,
    onYes: () => void,
    onNo: () => void,
}) {
    const { width: W, height: H } = ScreenGaugePack.get('window');
    return (
        <ModalOverlay
            visible={visible}
            onRequestClose={onNo}
            animationType="fade"
            transparent
        >
            <LayoutCanvasRoot style={{
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.35)',
                flex: 1,
                alignItems: 'center',
            }}>
                <VisualTokenBgLayer
                    source={confirmBgImg}
                    style={{
                        alignItems: 'center',
                        height: H * 0.23,
                        justifyContent: 'center',
                        width: W * 0.88,
                    }}
                    imageStyle={{
                        resizeMode: 'stretch',
                    }}
                >
                    <TextGlyphBlock style={{
                        fontFamily: sihecifntsor.fisansatiItalic,
                        fontStyle: 'italic',
                        fontSize: W * 0.052,
                        color: '#141414',
                        width: '90%',
                        textAlign: 'center',
                    }}>
                        {text}
                    </TextGlyphBlock>
                </VisualTokenBgLayer>
                <LayoutCanvasRoot style={{
                    justifyContent: 'center',
                    marginTop: H * 0.025,
                    flexDirection: 'row',
                }}>
                    <PressGateNode
                        onPress={onYes}
                        style={{ marginRight: W * 0.08 }}>
                        <VisualTokenLayer
                            source={btnYesImg}
                            style={{
                                width: W * 0.23,
                                resizeMode: 'contain',
                                height: H * 0.07,
                            }}
                        />
                    </PressGateNode>
                    <PressGateNode
                        onPress={onNo}
                    >
                        <VisualTokenLayer
                            style={{
                                height: H * 0.07,
                                resizeMode: 'contain',
                                width: W * 0.23,
                            }}
                            source={btnNoImg}
                        />
                    </PressGateNode>
                </LayoutCanvasRoot>
            </LayoutCanvasRoot>
        </ModalOverlay>
    );
}
