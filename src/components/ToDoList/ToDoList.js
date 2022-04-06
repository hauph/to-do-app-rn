import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  Pressable,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SwipeListView} from 'react-native-swipe-list-view';

export const ToDoList = props => {
  // const [currentOpenRow, setCurrentOpenRow] = useState('');
  const [currentSelectedRow, setCurrentSelectedRow] = useState('');

  const {toDoList} = props;

  const closeRow = (rowKey, rowMap) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  // const onRowDidOpen = (rowKey, rowMap) => {
  //   // Close current open row
  //   if (currentOpenRow.length && currentOpenRow !== rowKey) {
  //     closeRow(rowMap, currentOpenRow);
  //   }

  //   setCurrentOpenRow(rowKey);
  // };

  const deleteRow = rowKey => {
    Alert.alert('Would you like to delete this task?', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('cancel'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => props.deleteToDo([rowKey])},
    ]);
  };

  const pinOrUnpinRow = (rowKey, rowMap) => {
    props.updateToDoPin(rowKey);
    closeRow(rowKey, rowMap);
  };

  const renderItem = (data, rowMap) => (
    <Pressable
      style={data.item.pin ? [styles.item, styles.pinned] : styles.item}
      onPress={() => closeRow(data.item.key, rowMap)}>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={
            data.item.completed
              ? [styles.task, {textDecorationLine: 'line-through'}]
              : styles.task
          }
          numberOfLines={1}>
          {data.item.task}
        </Text>
      </View>
    </Pressable>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={[styles.rowBack, styles.item]}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backLeftBtn]}
        onPress={() => props.updateToDoStatus(data.item.key)}>
        <FontAwesome5
          name={data.item.completed ? 'check-circle' : 'circle'}
          style={[styles.textWhite, styles.icon]}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backRightBtn}
        onPress={() => deleteRow(data.item.key)}>
        <FontAwesome5
          name={'trash-alt'}
          style={[styles.textWhite, styles.icon]}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => pinOrUnpinRow(data.item.key, rowMap)}>
        <Icon
          name={data.item.pin ? 'pin-off-outline' : 'pin-outline'}
          style={[styles.textWhite, styles.icon]}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      {toDoList.length ? (
        <SwipeListView
          data={toDoList}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={60}
          rightOpenValue={-120}
          previewRowKey={toDoList[0].key}
          previewOpenValue={-30}
          previewOpenDelay={1000}
          // onRowDidOpen={onRowDidOpen}
        />
      ) : null}
    </>
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
  icon: {
    fontSize: 25,
  },
  textWhite: {
    color: '#fff',
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
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 60,
  },
  backLeftBtn: {
    backgroundColor: '#378805',
    left: 0,
  },
  pinned: {
    backgroundColor: '#FFCC00',
  },
});
