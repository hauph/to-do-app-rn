import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  View,
  Pressable,
  Text,
} from 'react-native';
import {Headline} from 'react-native-paper';
import {useToDoData} from '../../hooks/hooks';
import {ToDoList} from '../ToDoList/ToDoList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Main = () => {
  const [text, setText] = useState('');
  const [textInputBorderColor, setTextInputBorderColor] =
    useState('rgba(0, 0, 0, .1)');

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

  const {toDoList, addToDo, deleteToDo, updateToDoStatus, updateToDoPin} =
    useToDoData();

  const handleAddToDo = () => {
    addToDo(text.trim());
    setText('');
    setTextInputBorderColor('rgba(0, 0, 0, .1)');
  };

  console.log('toDoList >>>', toDoList);
  return (
    <>
      <View style={styles.generalMargin}>
        <Pressable
          style={styles.btnSelectTasks}
          onPress={() => {
            console.log('press');
          }}>
          <Text style={styles.btn}>Select tasks</Text>
        </Pressable>
        <Headline style={styles.headline}>Todos</Headline>
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

      <ToDoList
        toDoList={toDoList}
        deleteToDo={deleteToDo}
        updateToDoStatus={updateToDoStatus}
        updateToDoPin={updateToDoPin}
      />
    </>
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
    fontSize: 35,
    fontWeight: 'bold',
  },
});

export default Main;
