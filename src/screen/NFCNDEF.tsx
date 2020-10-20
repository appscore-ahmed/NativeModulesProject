import * as React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import NFCUIComponent from '../components/NFCUIComponent';
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';

const NFCNDEF = () => {
  React.useEffect(() => {
    NfcManager.start();

    return () => {
      _cancel();
    };
  }, []);

  const buildUrlPayload = (valueToWrite: string) => {
    return Ndef.encodeMessage([Ndef.uriRecord(valueToWrite)]);
  };
  const _cancel = () => {
    NfcManager.cancelTechnologyRequest().catch(() => 0);
  };

  const _test = async () => {
    try {
      let resp = await NfcManager.requestTechnology(NfcTech.Ndef, {
        alertMessage: 'Ready to write some NFC tags!',
      });
      console.log('resp: ' + resp);
      let ndef = await NfcManager.getNdefMessage();
      console.log('ndef message: ' + ndef);
      let bytes = buildUrlPayload('https://www.revteltech.com');
      await NfcManager.writeNdefMessage(bytes);
      console.log('successfully write ndef');
      Alert.alert('successfully write ndef');
      await NfcManager.setAlertMessageIOS('I got your tag!');
      _cancel();
    } catch (ex) {
      console.log('ex', ex);
      _cancel();
    }
  };

  return (
    <View style={styles.container}>
      <NFCUIComponent
        label="NDEF"
        TestFunction={_test}
        CancelFunction={_cancel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default NFCNDEF;
