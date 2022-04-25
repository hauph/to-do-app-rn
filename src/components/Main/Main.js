import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  View,
  Pressable,
  Text,
  ScrollView,
} from 'react-native';
import {Divider, Headline, Menu} from 'react-native-paper';
import {useToDoData, useViewType} from '../../hooks/hooks';
import ToDoList from '../ToDoList/ToDoList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Main = () => {
  const [text, setText] = useState('');
  const [stickyHeaderStyle, setStickyHeaderStyle] = useState({
    backgroundColor: '#fff',
  });
  const [textInputBorderColor, setTextInputBorderColor] =
    useState('rgba(0, 0, 0, .1)');
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [viewTypeLabel, setViewTypeLabel] = useState('');
  const [multiSelect, setMultiSelect] = useState(false);

  const {toDoList, addToDo, deleteToDo, updateToDoStatus, updateToDoPin} =
    useToDoData();
  const {viewType, setViewType} = useViewType();

  // Clear AsyncStorage. Should be used in DEV only
  useEffect(() => {
    (async () => {
      try {
        // Turn on this when we need to clear AsyncStorage
        // await AsyncStorage.clear();
      } catch (e) {
        // clear error
        console.error(e);
      }
    })();
  }, []);

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

  const handleClearCompletedTasks = () => {
    const idList = toDoList.reduce((deleteListId, task) => {
      const {completed, key} = task;

      if (completed) {
        deleteListId.push(key);
      }

      return deleteListId;
    }, []);

    deleteToDo(idList);
    setMenuVisibility(false);
  };

  // console.log('toDoList >>>', toDoList);
  return (
    <ScrollView
      scrollEventThrottle={5000}
      stickyHeaderIndices={[0]}
      horizontal={false}
      onScroll={handleOnScroll}>
      <View style={stickyHeaderStyle}>
        <View style={styles.generalMargin}>
          <View style={styles.selectTasksAndOtherActions}>
            <Pressable
              style={styles.btnSelectTasks}
              onPress={() => {
                setMultiSelect(!multiSelect);
              }}>
              <Text style={styles.btn}>
                {!multiSelect ? 'Select tasks' : 'Actions'}
              </Text>
            </Pressable>

            <Menu
              visible={menuVisibility}
              onDismiss={() => setMenuVisibility(false)}
              anchor={
                <Pressable
                  style={styles.btnSelectTasks}
                  onPress={() => {
                    setMenuVisibility(true);
                  }}>
                  <Text style={styles.btn}>...</Text>
                </Pressable>
              }>
              {['all', 'active', 'completed'].map((label, index) => (
                <Menu.Item
                  key={label}
                  titleStyle={index === viewType ? {color: '#007AFF'} : {}}
                  onPress={() => {
                    handleSetViewType(index);
                  }}
                  title={`View ${label} tasks`}
                />
              ))}
              <Divider style={{backgroundColor: 'grey'}} />
              <Menu.Item
                onPress={handleClearCompletedTasks}
                title="Clear completed tasks"
              />
            </Menu>
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
        main={true}
        viewType={viewType}
        multiSelect={multiSelect}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  generalMargin: {
    marginHorizontal: 20,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: Dimensions.get('window').width - 80,
    height: 60,
    margin: 12,
    marginLeft: 0,
    padding: 16,
    borderWidth: 1,
    fontSize: 24,
    borderRadius: 4,
  },
  btn: {
    color: '#007AFF',
    fontSize: 18,
  },
  btnSelectTasks: {
    marginBottom: 20,
  },
  headline: {
    fontSize: 33,
    fontWeight: 'bold',
  },
  selectTasksAndOtherActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Main;
