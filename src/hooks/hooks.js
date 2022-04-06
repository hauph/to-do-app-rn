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
        key: generate(),
        task,
        completed: false,
        pin: false,
        pos: toDoList.length,
      };

      setToDoList([...toDoList, newTask]);
    }
  };

  const deleteToDo = idList => {
    const newToDoList = toDoList.filter(task => !idList.includes(task.key));

    setToDoList(newToDoList);
  };

  const updateToDoStatus = id => {
    const newToDoList = toDoList.map(task => {
      const {key, completed} = task;

      if (key === id) {
        task.completed = !completed;
      }

      return task;
    });

    setToDoList(newToDoList);
  };

  const updateToDoPin = id => {
    const newToDoList = toDoList.filter(task => task.key !== id);
    const task = toDoList.find(t => t.key === id);
    const {pin, pos} = task;

    if (pin) {
      // Unpin
      task.pin = false;
      newToDoList.splice(pos, 0, task);
    } else {
      // pin
      task.pin = true;
      newToDoList.unshift(task);
    }

    setToDoList(newToDoList);
  };

  return {toDoList, addToDo, deleteToDo, updateToDoStatus, updateToDoPin};
};
