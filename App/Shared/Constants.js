import {Dimensions, Animated} from 'react-native';

export const FYC = 'FYC';
export const PRESS = 'PRESS';
export const LINK = 'LINK';
export const ALL = 'All';
export const CATEGORY = 'Category';
export const FAQ = 'FAQ';
export const SIGN_OUT = 'Sign Out';
export const FEATURE = 'feature';
export const MPD = '.mpd';
export const M3U8 = '.m3u8';
export const POWERED_BY = `Powered by Deluxe One.`;
export const BUTTON = 'button';
export const WATCH_NOW = 'Watch Now';
export const ANIMATION_DURATION = 150;
export const ALL_RIGHTS_RESERVER = `Copyright ${'\u00A9'} ${new Date().getFullYear()} Apple Inc. All rights reserved.`;
export const SCALE_VALUE = new Animated.Value(0);

export const SWITCH_ENV_CODE = 'switchENV';
export const INT = 'INT';
export const PROD = 'PROD';
export const UAT = 'UAT';

export const FYCRefererPROD = 'fyc.appletvplus.com';
export const FYCRefererINT = 'fyc-apple.dmlib.in';
export const FYCRefererUAT = 'https://fyc-apple.dmlib.pro/';
export const PressRefererPROD = 'screeners.appletvplus.com';
export const PressRefererINT = 'apple-screeners-int.deluxeone.com';
export const PressRefererUAT = 'https://press-apple.dmlib.pro/';
export const ConfigRefererINT = 'https://one-service.dmlib.in/api/v1';
export const ConfigRefererPROD = 'https://one-service.dmlib.io/api/v1';
export const ConfigRefererUAT = 'https://one-service.dmlib.pro/api/v1';

export const WIDTH = Dimensions.get('screen').width;
export const HEIGHT = Dimensions.get('screen').height;

export const FAQ_FYC = [
  {
    id: '1',
    question: 'How do I request a code?',
    answer:
      'As a voting member, you were given a code either by your affiliate voting group or Apple Awards. Never received a code? Please email awards@apple.com.',
  },
  {
    id: '2',
    question: 'How often do I need to use my code?',
    answer:
      'Once per viewing session, and the same code can be used for subsequent sessions. After you submit your code, you’ll have access to every Apple Original on fyc.appletvplus.com for the entire session.',
  },
  {
    id: '3',
    question: 'What do I do if my code doesn’t work?',
    answer:
      'If your code does not work, email awards@apple.com for assistance.',
  },
  {
    id: '4',
    question: 'How do I watch in full screen?',
    answer:
      'In the video player, click on the icon in the bottom right-hand corner.',
  },
  {
    id: '5',
    question: 'Where can I watch FYC Apple Originals?',
    answer:
      'You can watch FYC Apple Originals on iPhone, iPad, Apple TV, Roku, Chromecast, as well as on the web at fyc.appletvplus.com across all of your devices. Search for Apple TV+ Screeners (keyword: “screeners”) on the Apple App Store or Roku Channel Store for our app.',
  },
  {
    id: '6',
    question: 'How do I AirPlay video and mirror my device’s screen?',
    answer:
      'To use AirPlay to stream content or mirror exactly what’s on your Apple devices to your Apple TV or AirPlay 2-compatible smart TV, please visit our support article. Note that not all Apple Originals are available with AirPlay. AirPlay will be enabled as full series or films premiere on Apple TV+.',
  },
  {
    id: '7',
    question: 'How do I watch on my TV with Chromecast?',
    answer: `1. Make sure your computer is connected to the same Wi-Fi network as your Chromecast device.\n2. Go to fyc.appletvplus.com in your Chrome browser, enter the code, and navigate to the Apple Original you want to watch.\n3. Select the three-dot menu button in the top right of your Chrome browser.\n4. Select Cast and a dialog box will appear.\n5. Select the name of your Chromecast device.\n6. Start playing the video from your computer to your television.`,
  },
  {
    id: '8',
    question: 'What if I’m having other issues?',
    answer:
      'If you’re still experiencing issues, email us at awards@apple.com.',
  },
];

export const FAQ_PRESS = [
  {
    id: '1',
    question: 'How do I request access to the press screeners?',
    answer:
      'If you are not a registered user, email screeners@apple.com for assistance. Please note your media affiliation.',
  },
  {
    id: '2',
    question: 'How often do I need to sign in?',
    answer:
      'Sign in once per viewing session. After you sign in, you’ll have access to Apple Originals on screeners.appletvplus.com for the entire session.',
  },
  {
    id: '3',
    question: 'What if I forgot my password?',
    answer:
      'If your password is not working, select “Reset Password” when you sign in. Follow the steps to reset your password. If you are still having issues, email screeners@apple.com.',
  },
  {
    id: '4',
    question:
      'Can I share my credentials with other colleagues that need access?',
    answer:
      'No, only you should have access to your account. If you know of someone else who needs an account, please have them reach out to screeners@apple.com.',
  },
  {
    id: '5',
    question: 'How do I watch in full screen?',
    answer:
      'In the video player, click on the icon in the bottom right-hand corner.',
  },
  {
    id: '6',
    question: 'Where can I watch Apple Originals?',
    answer:
      'You can watch Apple Originals on iPhone, iPad, Apple TV, Roku, Chromecast, as well as on the web at screeners.appletvplus.com across all of your devices. Search for Apple TV+ Screeners (keyword: "screeners") on the Apple App Store or Roku Channel Store for our app.',
  },
  {
    id: '7',
    question: 'How do I AirPlay video and mirror my device’s screen?',
    answer:
      'To use AirPlay to stream content or mirror exactly what’s on your Apple devices to your Apple TV or AirPlay 2-compatible smart TV, please visit our support article. Note that not all Apple Originals are available with AirPlay. AirPlay will be enabled as full series or films premiere on Apple TV+.',
  },
  {
    id: '8',
    question: 'How do I watch on my TV with Chromecast?',
    answer: `1. Make sure your computer is connected to the same Wi-Fi network as your Chromecast device.\n2. Go to screeners.appletvplus.com in your Chrome browser, sign in, and navigate to the Apple Original you want to watch.\n3. Select the three-dot menu button in the top right of your Chrome browser.\n4. Select Cast and a dialog box will appear.\n5. Select the name of your Chromecast device.\n6. Start playing the video from your computer to your television.`,
  },
  {
    id: '9',
    question: 'What if I’m having other issues?',
    answer:
      'If you’re still experiencing issues, email us at screeners@apple.com.',
  },
];
