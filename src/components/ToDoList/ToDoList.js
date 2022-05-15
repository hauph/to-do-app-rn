import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, Alert, Pressable} from 'react-native';
import {List} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Utils} from '../../utils';
import {ToDoListStyles as styles} from './ToDoList.style';

export const ToDoList = props => {
  // const [currentOpenRows, setCurrentOpenRows] = useState([]);
  // const [currentSelectedRow, setCurrentSelectedRow] = useState('');
  const [currentPinnedList, setCurrentPinnedList] = useState([]);
  const [tdList, setTDList] = useState([]);
  const [expanded, setExpanded] = useState(true);

  const {
    toDoList,
    deleteToDo,
    updateToDoStatus,
    updateToDoPin,
    viewType,
    multiSelect,
    selectedList,
    setSelectedList,
    isBulkPin,
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
    const pinnnedList = tdList.reduce((arr, task) => {
      const {pin, pinnedIndex} = task;

      if (pin && !Utils.isNullOrUndefined(pinnedIndex)) {
        arr[pinnedIndex] = task;
      }

      return arr;
    }, []);

    setCurrentPinnedList(Utils.removeEmptyItemInArray(pinnnedList));
  }, [tdList]);

  useEffect(() => {
    // When we want to pin multipe tasks
    if (isBulkPin) {
      let index = currentPinnedList.reduce((number, task) => {
        const {pinnedIndex} = task;

        if (number === null) {
          number = pinnedIndex;
        } else {
          number = number < pinnedIndex ? pinnedIndex : number;
        }

        return number;
      }, null);

      const data = selectedList.map(item => {
        index += 1;

        return {
          id: item,
          pinnedIndex: index,
        };
      });

      updateToDoPin(data);
      setSelectedList([]);
    }
  }, [isBulkPin]);

  const closeRow = (rowKey, rowMap) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  // const handlRowDidOpen = rowKey => {
  //   const clonedCurrentOpenRows = [...currentOpenRows];
  //   clonedCurrentOpenRows.push(rowKey);
  //   setCurrentOpenRows(clonedCurrentOpenRows);
  // };

  // const handleRowDidClose = rowKey => {
  //   const clonedCurrentOpenRows = [...currentOpenRows];
  //   const newOpenRows = clonedCurrentOpenRows.filter(key => key !== rowKey);
  //   setCurrentOpenRows(newOpenRows);
  // };

  const handleDeleteRow = rowKey => {
    Alert.alert('Would you like to delete this task?', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('cancel'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => deleteToDo([rowKey])},
    ]);
  };

  const handlePinOrUnpinRow = (rowKey, rowMap) => {
    const latestPinnedIndex = currentPinnedList.reduce((number, task) => {
      const {pinnedIndex} = task;

      if (number === null) {
        number = pinnedIndex;
      } else {
        number = number < pinnedIndex ? pinnedIndex : number;
      }

      return number;
    }, null);

    updateToDoPin([{id: rowKey, pinnedIndex: latestPinnedIndex + 1}]);
    closeRow(rowKey, rowMap);
  };

  const handleMultiSelect = id => {
    let idList = [...selectedList];

    if (idList.includes(id)) {
      idList = idList.filter(_id => _id !== id);
    } else {
      idList.push(id);
    }

    // After getting the idList, we will sort it according to the order in tdList
    const finalIdList = idList.reduce((arr, _id) => {
      const index = tdList.findIndex(task => task.key === _id);
      arr[index] = _id;
      return arr;
    }, []);

    setSelectedList(Utils.removeEmptyItemInArray(finalIdList));
  };

  const renderItem = (data, rowMap) => {
    let pressableStyle = styles.item;

    if (data.item.pin) {
      pressableStyle = [pressableStyle, styles.pinned, styles.notMain];
    }

    return (
      <View style={multiSelect ? styles.viewMultiSelect : {}}>
        {multiSelect && (
          <Pressable
            onPress={() => handleMultiSelect(data.item.key)}
            style={{
              width: 40,
              marginLeft: 20,
            }}>
            {!selectedList.length ? (
              <FontAwesome5 name="circle" style={[styles.icon]} />
            ) : (
              <FontAwesome5
                name={
                  selectedList.includes(data.item.key)
                    ? 'check-circle'
                    : 'circle'
                }
                style={[styles.icon]}
              />
            )}
          </Pressable>
        )}

        <Pressable
          style={!multiSelect ? pressableStyle : [pressableStyle, {flex: 1}]}
          onPress={() => (!multiSelect ? closeRow(data.item.key, rowMap) : {})}>
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
      </View>
    );
  };

  const renderHiddenItem = (data, rowMap) =>
    !multiSelect && (
      <View
        style={
          data.item.pin
            ? [styles.rowBack, styles.item, styles.notMain]
            : [styles.rowBack, styles.item]
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
          onPress={() => handleDeleteRow(data.item.key)}>
          <FontAwesome5
            name={'trash-alt'}
            style={[styles.textWhite, styles.icon]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnLeft]}
          onPress={() => handlePinOrUnpinRow(data.item.key, rowMap)}>
          <Icon
            name={data.item.pin ? 'pin-off-outline' : 'pin-outline'}
            style={[styles.textWhite, styles.icon]}
          />
        </TouchableOpacity>
      </View>
    );

  return (
    <>
      {currentPinnedList.length ? (
        <View style={styles.pinnedView}>
          <List.Accordion
            title="Pinned Tasks"
            style={styles.listBackground}
            titleStyle={styles.listTitle}
            expanded={expanded}
            onPress={() => setExpanded(!expanded)}>
            <SwipeListView
              data={currentPinnedList}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              leftOpenValue={60}
              stopLeftSwipe={60}
              rightOpenValue={-120}
              stopRightSwipe={-120}
              disableLeftSwipe={multiSelect}
              disableRightSwipe={multiSelect}
              previewRowKey={multiSelect ? '' : currentPinnedList[0].key}
              previewOpenValue={-30}
              previewOpenDelay={1000}
              // onRowDidOpen={handlRowDidOpen}
              // onRowDidClose={handleRowDidClose}
            />
          </List.Accordion>
        </View>
      ) : null}

      {tdList.filter(item => !item.pin).length ? (
        <SwipeListView
          data={tdList.filter(item => !item.pin)}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={60}
          stopLeftSwipe={60}
          rightOpenValue={-120}
          stopRightSwipe={-120}
          disableLeftSwipe={multiSelect}
          disableRightSwipe={multiSelect}
          previewRowKey={
            multiSelect ? '' : tdList.filter(item => !item.pin)[0].key
          }
          previewOpenValue={-30}
          previewOpenDelay={1000}
          // onRowDidOpen={handlRowDidOpen}
          // onRowDidClose={handleRowDidClose}
        />
      ) : null}
    </>
  );
};

export default ToDoList;
