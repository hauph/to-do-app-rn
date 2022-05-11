import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import BaseMenu from '../BaseMenu/BaseMenu';

const BulkActions = props => {
  const {
    multiSelect,
    setMultiSelect,
    visible,
    setLeftMenuVisibility,
    onCheck,
    onDelete,
    onPin,
    onDone,
  } = props;

  return !multiSelect ? (
    <Pressable
      style={styles.btnSelectTasks}
      onPress={() => {
        setMultiSelect(!multiSelect);
      }}>
      <Text style={styles.btn}>Select tasks</Text>
    </Pressable>
  ) : (
    <BaseMenu
      menuProps={{
        visible: visible,
        onDismiss: () => setLeftMenuVisibility(false),
        anchor: (
          <Pressable
            style={styles.btnSelectTasks}
            onPress={() => {
              setLeftMenuVisibility(true);
            }}>
            <Text style={styles.btn}>Actions</Text>
          </Pressable>
        ),
      }}
      options={[
        {
          key: 'complete',
          onPress: () => onCheck(),
          title: 'Mark/unmark tasks',
        },
        {
          key: 'pin',
          onPress: () => onPin(),
          title: 'Pin/unpin tasks',
        },
        {
          key: 'delete',
          onPress: () => onDelete(),
          title: 'Delete tasks',
        },
      ]}
      showDivider={true}
      dividerProps={{style: {backgroundColor: 'grey'}}}
      optionsAfterDivider={[
        {
          key: 'one',
          onPress: () => onDone(),
          title: 'Done',
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  btn: {
    color: '#007AFF',
    fontSize: 18,
  },
  btnSelectTasks: {
    marginBottom: 20,
  },
});

export default BulkActions;
