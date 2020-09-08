import React, {useState} from 'react';
import NativeModules from '../CustomModules';

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
