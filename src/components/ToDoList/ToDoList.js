import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {Button} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {SwipeListView} from 'react-native-swipe-list-view';

const renderItem = data => (
  <TouchableHighlight style={styles.item}>
    <View>
      <Text style={styles.task}>{data.item.task}</Text>
    </View>
  </TouchableHighlight>
);

const renderHiddenItem = () => (
  <View style={[styles.rowBack, styles.item]}>
    <TouchableOpacity style={[styles.backRightBtn]}>
      <FontAwesome5
        name={'trash-alt'}
        style={[styles.textWhite, {fontSize: 20}]}
      />
    </TouchableOpacity>
  </View>
);

export const ToDoList = props => {
  const {toDoList} = props;

  return (
    <SwipeListView
      data={toDoList}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      rightOpenValue={-60}
      previewRowKey={'0'}
      previewOpenValue={-40}
      previewOpenDelay={3000}
      // onRowDidOpen={onRowDidOpen}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,.1)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,.1)',
    padding: 20,
    marginVertical: 8,
    backgroundColor: '#fff',
  },
  task: {
    fontSize: 16,
  },
  rowBack: {
    flex: 1,
  },
  backRightBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: 'red',
    right: 0,
  },
  textWhite: {
    color: '#fff',
  },
  // backRightBtnLeft: {
  //   backgroundColor: 'blue',
  //   right: 75,
  // },
});
