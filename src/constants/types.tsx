export type ScreenTypes = {
  Camera: {title: string} | undefined;
  Geolocation: {coords: string} | undefined;
  ImagePicker: {image: string} | undefined;
  VideoView: undefined;
  Home: undefined;
  CollapsableToolbar: undefined;
  NFC: undefined;
  NFCListener: undefined;
  NFCMifare: undefined;
  NFCNDEF: undefined;
};

export type BottomTabScreenType = {
  NPM: undefined;
  Home: undefined;
};

export type NPMScreenTypes = {
  NPM: undefined;
  CameraNPM: undefined;
  GeolocationNPM: undefined;
  CameraRollNPM: undefined;
  VideoNPM: undefined;
  ScrollViewAnimation: undefined;
};
