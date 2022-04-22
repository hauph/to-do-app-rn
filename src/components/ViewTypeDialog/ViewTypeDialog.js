import React, {useState} from 'react';
import {Button} from 'react-native';
import {Dialog, Portal} from 'react-native-paper';
import RadioForm from 'react-native-simple-radio-button';

const ViewTypeDialog = props => {
  const {visible, hideDialog, viewType} = props;
  const [radioValue, setValue] = useState(
    typeof viewType === 'string' ? 0 : viewType,
  );

  const radio_props = [
    {label: 'All', value: 0},
    {label: 'Active', value: 1},
    {label: 'Completed', value: 2},
  ];

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => hideDialog(radioValue)}>
        <Dialog.Title>Choose how to view tasks</Dialog.Title>
        <Dialog.Content>
          <RadioForm
            radio_props={radio_props}
            initial={radioValue}
            onPress={newRadioValue => setValue(newRadioValue)}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => hideDialog(radioValue)} title="Done" />
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ViewTypeDialog;
