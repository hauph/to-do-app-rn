import React, {useState} from 'react';
import {Button, Dimensions, StyleSheet, TextInput, View} from 'react-native';
import {useToDoData} from '../../hooks/hooks';

const Main = () => {
  const [text, setText] = useState('');
  const [textInputBorderColor, setTextInputBorderColor] =
    useState('rgba(0, 0, 0, .1)');

  const {toDoList, addToDo} = useToDoData();

  const handleAddToDo = () => {
    addToDo(text);
    setText('');
    setTextInputBorderColor('rgba(0, 0, 0, .1)');
  };

  // console.log('toDoList >>>', toDoList);
  return (
    <>
      <View style={styles.view}>
        <TextInput
          style={[styles.input, {borderColor: textInputBorderColor}]}
          value={text}
          placeholder="What needs to be done?"
          autoCapitalize="none"
          onChangeText={setText}
          onFocus={() => setTextInputBorderColor('rgba(0, 123, 255, 1)')}
        />
        <Button title="Add" onPress={handleAddToDo} />
      </View>

      {/* <View></View> */}
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: Dimensions.get('window').width - 100,
    height: 60,
    margin: 12,
    padding: 16,
    borderWidth: 1,
    // borderColor: 'rgba(0, 0, 0, .1)',
    fontSize: 24,
    borderRadius: 4,
  },
});

export default Main;
