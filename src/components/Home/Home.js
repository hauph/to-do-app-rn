import React, {useState, useEffect} from 'react';
import {
  Alert,
  TextInput,
  View,
  Pressable,
  Text,
  ScrollView,
} from 'react-native';
import {Headline} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useViewType} from '../../hooks/hooks';
import ToDoList from '../ToDoList/ToDoList';
import BulkActions from '../BulkActions/BulkActions';
import BaseMenu from '../BaseMenu/BaseMenu';
import {HomeStyles as styles} from './Home.style';

const Home = props => {
  const {
    toDoList,
    addToDo,
    deleteToDo,
    updateToDoStatus,
    updateToDoPin,
    setCurrentSelectedRow,
  } = props;
  const {viewType, setViewType} = useViewType();

  const [text, setText] = useState('');
  const [stickyHeaderStyle, setStickyHeaderStyle] = useState({
    backgroundColor: '#fff',
  });
  const [textInputBorderColor, setTextInputBorderColor] =
    useState('rgba(0, 0, 0, .1)');
  const [viewTypeLabel, setViewTypeLabel] = useState('');
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [leftMenuVisibility, setLeftMenuVisibility] = useState(false);
  const [multiSelect, setMultiSelect] = useState(false);
  const [isBulkPin, setIsBulkPin] = useState(false);
  const [completedIdList, setCompletedIdList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);

  useEffect(() => {
    switch (viewType) {
      case 1:
        setViewTypeLabel('- Active');
        break;
      case 2:
        setViewTypeLabel('- Completed');
        break;
      default:
        setViewTypeLabel('');
        break;
    }
  }, [viewType]);

  useEffect(() => {
    const idList = toDoList.reduce((deleteListId, task) => {
      const {completed, key} = task;

      if (completed) {
        deleteListId.push(key);
      }

      return deleteListId;
    }, []);

    setCompletedIdList(idList);
  }, [toDoList]);

  const handleAddToDo = () => {
    addToDo(text.trim());
    setText('');
    setTextInputBorderColor('rgba(0, 0, 0, .1)');
  };

  const handleOnScroll = e => {
    const {nativeEvent} = e;
    const {contentOffset} = nativeEvent;
    let style = {
      backgroundColor: '#fff',
    };

    if (contentOffset.y > 0) {
      style = {
        ...style,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,.5)',
      };
    }

    setStickyHeaderStyle(style);
  };

  const handleSetViewType = vType => {
    setMenuVisibility(false);
    setViewType(vType);
  };

  const alertDeleteTasks = (title, message) => {
    return new Promise((resolve, reject) => {
      Alert.alert(title, message, [
        {
          text: 'Cancel',
          onPress: () => resolve({status: 0}),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => resolve({status: 1}),
        },
      ]);
    });
  };

  const handleClearCompletedTasks = async () => {
    setMenuVisibility(false);
    const alert = await alertDeleteTasks(
      `Would you like to delete completed task${
        completedIdList.length > 1 ? 's' : ''
      }?`,
      '',
    );

    if (alert.status) {
      deleteToDo(completedIdList);
    }
  };

  const handleBulkCheck = () => {
    updateToDoStatus(selectedList);
    setLeftMenuVisibility(false);
    setSelectedList([]);
  };

  const handleBulkDelete = async () => {
    setLeftMenuVisibility(false);

    const alert = await alertDeleteTasks(
      `Would you like to delete selected task${
        selectedList.length > 1 ? 's' : ''
      }?`,
      '',
    );

    if (alert.status) {
      deleteToDo(selectedList);
      setSelectedList([]);
    }
  };

  const handleBulkPin = () => {
    setIsBulkPin(true);

    setTimeout(() => {
      setLeftMenuVisibility(false);
      setIsBulkPin(false);
    }, 500);
  };

  const handleDoneMultiSelect = () => {
    setLeftMenuVisibility(false);
    setMultiSelect(false);
    setSelectedList([]);
  };

  return (
    <ScrollView
      scrollEventThrottle={5000}
      stickyHeaderIndices={[0]}
      horizontal={false}
      onScroll={handleOnScroll}>
      <View style={[stickyHeaderStyle, {marginTop: 15}]}>
        <View style={styles.generalMargin}>
          <View style={styles.selectTasksAndOtherActions}>
            <BulkActions
              multiSelect={multiSelect}
              setMultiSelect={setMultiSelect}
              visible={leftMenuVisibility}
              setLeftMenuVisibility={setLeftMenuVisibility}
              onCheck={handleBulkCheck}
              onDelete={handleBulkDelete}
              onPin={handleBulkPin}
              onDone={handleDoneMultiSelect}
            />

            <BaseMenu
              menuProps={{
                visible: menuVisibility,
                onDismiss: () => setMenuVisibility(false),
                anchor: (
                  <Pressable
                    style={styles.btnSelectTasks}
                    onPress={() => {
                      setMenuVisibility(true);
                    }}>
                    <FontAwesome5 name="ellipsis-h" style={styles.btn} />
                  </Pressable>
                ),
              }}
              options={[
                {
                  key: 'all',
                  titleStyle: viewType === 0 ? {color: '#007AFF'} : {},
                  onPress: () => handleSetViewType(0),
                  title: 'View all tasks',
                },
                {
                  key: 'active',
                  titleStyle: viewType === 1 ? {color: '#007AFF'} : {},
                  onPress: () => handleSetViewType(1),
                  title: 'View active tasks',
                },
                {
                  key: 'completed',
                  titleStyle: viewType === 2 ? {color: '#007AFF'} : {},
                  onPress: () => handleSetViewType(2),
                  title: 'View completed tasks',
                },
              ]}
              showDivider={true}
              dividerProps={{style: {backgroundColor: 'grey'}}}
              optionsAfterDivider={[
                {
                  key: 'one',
                  disabled: completedIdList.length === 0,
                  onPress: () => handleClearCompletedTasks(),
                  title: 'Clear completed tasks',
                },
              ]}
            />
          </View>
          <Headline style={styles.headline}>Todos {viewTypeLabel}</Headline>
        </View>

        <View style={[styles.view, styles.generalMargin]}>
          <TextInput
            style={[styles.input, {borderColor: textInputBorderColor}]}
            value={text}
            placeholder="What needs to be done?"
            autoCapitalize="none"
            onChangeText={setText}
            onFocus={() => setTextInputBorderColor('rgba(0, 123, 255, 1)')}
          />

          <Pressable onPress={handleAddToDo}>
            <Text style={styles.btn}>Add</Text>
          </Pressable>
        </View>
      </View>

      <ToDoList
        toDoList={toDoList}
        deleteToDo={deleteToDo}
        updateToDoStatus={updateToDoStatus}
        updateToDoPin={updateToDoPin}
        viewType={viewType}
        multiSelect={multiSelect}
        selectedList={selectedList}
        setSelectedList={setSelectedList}
        isBulkPin={isBulkPin}
        setCurrentSelectedRow={setCurrentSelectedRow}
      />
    </ScrollView>
  );
};

export default Home;
