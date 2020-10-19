import * as React from 'react';
import {View, StyleSheet, Platform, Alert} from 'react-native';
import NFCUIComponent from '../components/NFCUIComponent';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';

const NFCMifare = () => {
  React.useEffect(() => {
    NfcManager.start();

    return () => {
      _cleanup();
    };
  }, []);

  const _test = async () => {
    try {
      const tech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcA;
      const requestTech = await NfcManager.requestTechnology(tech, {
        alertMessage: 'Ready to do some custom Mifare cmd!',
      });
      // console.warn(resp);
      Alert.alert('requestTechnology: ' + requestTech);

      /* // the NFC uid can be found in tag.id
      let tag = await NfcManager.getTag();
      // console.warn(tag);
      Alert.alert('tag: ' + tag); */

      const response =
        Platform.OS === 'ios'
          ? await NfcManager.sendMifareCommandIOS([0x30, 0x00])
          : await NfcManager.transceive([0x30, 0x00]);

      // console.warn(resp);
      Alert.alert('sendMifareCommandIOS: ' + response);

      _cleanup();
    } catch (ex) {
      // console.warn('ex', ex);
      Alert.alert('error: ' + ex);
      _cleanup();
    }
  };

  const _cleanup = () => {
    NfcManager.cancelTechnologyRequest().catch(() => 0);
  };

  return (
    <View style={styles.container}>
      <NFCUIComponent
        label="Mifare"
        TestFunction={_test}
        CancelFunction={_cleanup}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default NFCMifare;
