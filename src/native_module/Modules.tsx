import {NativeModules} from 'react-native';

export enum shareType {
  image = 'image',
  text = 'text',
}

type _moduleType = {
  lifecycle(): Promise<string>;
};

export default NativeModules.LifecycleEventsModule as _moduleType;



export const shareToExternal = (
  source: string | undefined,
  type: shareType,
) => {
  NativeModules.ShareModule.share(source, type);
};

export const callCamera = (): Promise<string> => {
  return NativeModules.CameraModule.callCamera()
    .then((result: string) => {
      return Promise.resolve(result);
    })
    .catch((error: string) => {
      return Promise.reject(error);
    });
};

export const pickImage = (): Promise<string> => {
  return NativeModules.ImagePickerModule.pickImage()
    .then((result: string) => {
      return Promise.resolve(result);
    })
    .catch((error: string) => {
      return Promise.reject(error);
    });
};

export const fetchLocation = (): Promise<string> => {
  return NativeModules.GeolocationModule.fetchLocation()
    .then((result: string) => {
      return Promise.resolve(result);
    })
    .catch((error: string) => {
      return Promise.reject(error);
    });
};

export const getHardwareInfo = async () => {
  return await NativeModules.DeviceInfoModule.getDeviceInfo(
    NativeModules.DeviceInfoModule.Hardware,
  );
};

export const getNetworkStatus = async () => {
  return await NativeModules.DeviceInfoModule.getDeviceInfo(
    NativeModules.DeviceInfoModule.Internet,
  );
};

export const getPhoneID = async () => {
  return await NativeModules.DeviceInfoModule.getDeviceInfo(
    NativeModules.DeviceInfoModule.ID,
  );
};

export const getDisplay = async () => {
  return await NativeModules.DeviceInfoModule.getDeviceInfo(
    NativeModules.DeviceInfoModule.Display,
  );
};
