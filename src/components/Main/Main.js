import React, {useState, useEffect} from 'react';
import {useToDoData} from '../../hooks/hooks';
import Home from '../Home/Home';
import Edit from '../Edit/Edit';
import {Utils} from '../../utils';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const Main = () => {
  const {toDoList, addToDo, deleteToDo, updateToDoStatus, updateToDoPin} =
    useToDoData();
  const [currentSelectedRow, setCurrentSelectedRow] = useState(null);

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

  return Utils.isNullOrUndefined(currentSelectedRow) ? (
    <Home
      toDoList={toDoList}
      addToDo={addToDo}
      deleteToDo={deleteToDo}
      updateToDoStatus={updateToDoStatus}
      updateToDoPin={updateToDoPin}
      setCurrentSelectedRow={setCurrentSelectedRow}
    />
  ) : (
    <Edit
      task={currentSelectedRow}
      goBack={() => setCurrentSelectedRow(null)}
    />
  );
};

export default Main;
