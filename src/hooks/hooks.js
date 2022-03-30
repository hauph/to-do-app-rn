/* eslint-disable react-hooks/exhaustive-deps */

import {useState, useEffect} from 'react';
import {generate} from 'shortid';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useToDoData = () => {
  const [toDoList, setToDoList] = useState([]);

  const loadData = async () => {
    try {
      const toDoData = await AsyncStorage.getItem('@ToDoList');

      if (toDoData) {
        setToDoList(JSON.parse(toDoData));
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (toDoList.length) {
      return;
    }
    loadData();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('@ToDoList', JSON.stringify(toDoList));
  }, [toDoList]);

  const addToDo = task => {
    if (task.length) {
      const newTask = {
        id: generate(),
        task,
      };

      setToDoList([...toDoList, newTask]);
    }
  };

  return {toDoList, addToDo};
};
