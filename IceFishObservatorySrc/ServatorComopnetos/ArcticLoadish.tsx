import { View, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const ArcticLoadish = () => {
  const dimensions = Dimensions.get('window');

  const loaderHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        html, body {
          height: 100%;
          margin: 0;
          background: transparent;
        }
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          background: transparent;
        }
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        }
        .lds-spinner {
          height: 250px;
          width: 250px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-right: 50px;
          padding-bottom: 20px;
          position: relative;
        }
        .lds-spinner div {
          transform-origin: 30px 20px;
          position: absolute;
        }
        .lds-spinner div:after {
          content: " ";
          display: block;
          position: absolute;
          top: 2px;
          left: 37px;
          width: 6px;
          height: 19px;
          border-radius: 20%;
          animation: color 1.2s ease-in-out infinite;
        }
        .lds-spinner div:nth-child(1) {
          transform: rotate(0deg);
          animation-delay: -1.1s;
        }
        .lds-spinner div:nth-child(2) {
          transform: rotate(30deg);
          animation-delay: -1s;
        }
        .lds-spinner div:nth-child(3) {
          transform: rotate(60deg);
          animation-delay: -0.9s;
        }
        .lds-spinner div:nth-child(4) {
          transform: rotate(90deg);
          animation-delay: -0.8s;
        }
        .lds-spinner div:nth-child(5) {
          transform: rotate(120deg);
          animation-delay: -0.7s;
        }
        .lds-spinner div:nth-child(6) {
          transform: rotate(150deg);
          animation-delay: -0.6s;
        }
        .lds-spinner div:nth-child(7) {
          transform: rotate(180deg);
          animation-delay: -0.5s;
        }
        .lds-spinner div:nth-child(8) {
          transform: rotate(210deg);
          animation-delay: -0.4s;
        }
        .lds-spinner div:nth-child(9) {
          transform: rotate(240deg);
          animation-delay: -0.3s;
        }
        .lds-spinner div:nth-child(10) {
          transform: rotate(270deg);
          animation-delay: -0.2s;
        }
        .lds-spinner div:nth-child(11) {
          transform: rotate(300deg);
          animation-delay: -0.1s;
        }
        .lds-spinner div:nth-child(12) {
          transform: rotate(330deg);
          animation-delay: 0s;
        }
        .lds-spinner div:nth-child(12)::after {
          animation-delay: 0s;
        }
        .lds-spinner div:nth-child(1)::after {
          animation-delay: -1.1s;
        }
        .lds-spinner div:nth-child(2)::after {
          animation-delay: -1s;
        }
        .lds-spinner div:nth-child(3)::after {
          animation-delay: -0.9s;
        }
        .lds-spinner div:nth-child(4)::after {
          animation-delay: -0.8s;
        }
        .lds-spinner div:nth-child(5)::after {
          animation-delay: -0.7s;
        }
        .lds-spinner div:nth-child(6)::after {
          animation-delay: -0.6s;
        }
        .lds-spinner div:nth-child(7)::after {
          animation-delay: -0.5s;
        }
        .lds-spinner div:nth-child(8)::after {
          animation-delay: -0.4s;
        }
        .lds-spinner div:nth-child(9)::after {
          animation-delay: -0.3s;
        }
        .lds-spinner div:nth-child(10)::after {
          animation-delay: -0.2s;
        }
        .lds-spinner div:nth-child(11)::after {
          animation-delay: -0.1s;
        }
        @keyframes color {
          0% {
            background-color: darkcyan;
          }
          100% {
            background-color: white;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </body>
    </html>
  `;

  return (
    <View style={{
      height: dimensions.height * 0.55,
      alignSelf: 'center',
      flex: 0,
      width: dimensions.width * 0.9,
    }}>
      <WebView
        allowsInlineMediaPlayback={true}
        domStorageEnabled={true}
        mediaPlaybackRequiresUserAction={false}
        startInLoadingState={false}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        javaScriptEnabled={true}
        bounces={false}
        showsVerticalScrollIndicator={false}
        source={{ html: loaderHTML }}
        mixedContentMode="compatibility"
        style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
        scalesPageToFit={false}
      />
    </View>
  );
};

export default ArcticLoadish;