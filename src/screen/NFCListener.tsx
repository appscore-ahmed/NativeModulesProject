import * as React from 'react';
import {StyleSheet, View, Button, Alert, Text} from 'react-native';
import NfcManager, {NfcEvents, TagEvent} from 'react-native-nfc-manager';
import NFCUIComponent from '../components/NFCUIComponent';

const NFCListener = () => {
  React.useEffect(() => {
    NfcManager.start();
    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag: TagEvent) => {
      Alert.alert(`tag ${JSON.stringify(tag)}`);
      console.log('tag: ' + JSON.stringify(tag));
      // NfcManager.unregisterTagEvent()
      //   // .then(() => Alert.alert('unregistered'))
      //   .catch(() => 0);
    });

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.unregisterTagEvent()
        .then(() => console.log('nfc listener stopped'))
        .catch(() => 0);
    };
  }, []);

  const _test = async () => {
    try {
      await NfcManager.registerTagEvent();
    } catch (ex) {
      console.error(ex);
      NfcManager.unregisterTagEvent().catch(() => 0);
    }
  };

  const _cancel = async () => {
    NfcManager.unregisterTagEvent().catch(() => 0);
  };

  return (
    <View style={styles.container}>
      <NFCUIComponent
        label="Listen for the Tags"
        TestFunction={_test}
        CancelFunction={_cancel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NFCListener;
