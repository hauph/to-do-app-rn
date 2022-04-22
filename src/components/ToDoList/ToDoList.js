import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Pressable,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SwipeListView} from 'react-native-swipe-list-view';
import PinnedToDoList from '../PinnedToDoList/PinnedToDoList';
import {Utils} from '../../utils';

export const ToDoList = props => {
  // const [currentOpenRow, setCurrentOpenRow] = useState('');
  // const [currentSelectedRow, setCurrentSelectedRow] = useState('');
  const [currentPinnedList, setCurrentPinnedList] = useState([]);
  const [tdList, setTDList] = useState([]);

  const {
    toDoList,
    deleteToDo,
    updateToDoStatus,
    updateToDoPin,
    main,
    viewType,
  } = props;

  useEffect(() => {
    let list = JSON.parse(JSON.stringify(toDoList));

    if (viewType === 1) {
      // Show Active tasks
      list = toDoList.filter(task => !task.completed);
    } else if (viewType === 2) {
      // Show Completed tasks
      list = toDoList.filter(task => task.completed);
    }

    setTDList(list);
  }, [viewType, toDoList]);

  useEffect(() => {
    const pinnnedList = [];
    tdList.forEach(task => {
      const {pin, pinnedIndex} = task;

      if (pin && !Utils.isNullOrUndefined(pinnedIndex)) {
        pinnnedList[pinnedIndex] = task;
      }
    });

    setCurrentPinnedList(Utils.removeEmptyItemInArray(pinnnedList));
  }, [tdList]);

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
      {text: 'OK', onPress: () => deleteToDo([rowKey])},
    ]);
  };

  const pinOrUnpinRow = (rowKey, rowMap) => {
    updateToDoPin([{id: rowKey, pinnedIndex: currentPinnedList.length}]);
    closeRow(rowKey, rowMap);
  };

  const renderItem = (data, rowMap) => {
    let pressableStyle = main ? styles.item : [styles.item, styles.notMain];

    if (data.item.pin && !main) {
      pressableStyle = [pressableStyle, styles.pinned];
    }

    return data.item.pin && main ? (
      <></>
    ) : (
      <Pressable
        style={pressableStyle}
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
  };

  const renderHiddenItem = (data, rowMap) =>
    data.item.pin && main ? (
      <></>
    ) : (
      <View
        style={
          main
            ? [styles.rowBack, styles.item]
            : [styles.rowBack, styles.item, styles.notMain]
        }>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backLeftBtn]}
          onPress={() => updateToDoStatus([data.item.key])}>
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

  // console.log('currentPinnedList >>>', currentPinnedList);

  return (
    <>
      {currentPinnedList.length && main ? (
        <View style={styles.pinnedView}>
          <PinnedToDoList
            pinnedList={currentPinnedList}
            deleteToDo={deleteToDo}
            updateToDoStatus={updateToDoStatus}
            updateToDoPin={updateToDoPin}
            viewType={viewType}
          />
        </View>
      ) : null}

      {tdList.length ? (
        <SwipeListView
          data={tdList}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={60}
          rightOpenValue={-120}
          // disableLeftSwipe={true}
          // disableRightSwipe={true}
          previewRowKey={tdList[0].key}
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
  pinnedView: {
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 6,
    marginTop: 2,
  },
  pinned: {
    backgroundColor: '#FFC0CB',
  },
  notMain: {
    marginVertical: 0,
    borderTopWidth: 0,
  },
});

export default ToDoList;
