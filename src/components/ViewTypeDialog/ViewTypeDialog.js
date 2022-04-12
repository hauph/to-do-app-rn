import React from 'react';
import {Button, StyleSheet, Text} from 'react-native';
import {Dialog, Portal, RadioButton} from 'react-native-paper';

const ViewTypeDialog = props => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Alert</Dialog.Title>
        <Dialog.Content>
          <Text>This is simple dialog</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ViewTypeDialog;
