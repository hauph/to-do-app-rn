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
        pinnedIndex: null,
      };

      setToDoList([...toDoList, newTask]);
    }
  };

  const deleteToDo = idList => {
    const newToDoList = toDoList.filter(task => !idList.includes(task.key));

    setToDoList(newToDoList);
  };

  const updateToDoStatus = idList => {
    const newToDoList = toDoList.map(task => {
      const {key, completed} = task;

      for (let i = 0; i < idList.length; i++) {
        const id = idList[i];

        if (key === id) {
          task.completed = !completed;
          break;
        }
      }

      return task;
    });

    setToDoList(newToDoList);
  };

  const updateToDoPin = dataList => {
    const newToDoList = toDoList.map(task => {
      const {key, pin} = task;

      for (let i = 0; i < dataList.length; i++) {
        const {id, pinnedIndex} = dataList[i];

        if (key === id) {
          if (pin) {
            // Unpin
            task.pin = false;
          } else {
            // pin
            task.pin = true;
          }

          task.pinnedIndex = pinnedIndex;
          break;
        }
      }

      return task;
    });

    setToDoList(newToDoList);
  };

  // const updateToDoPin = (id, pinnedIndex = null) => {
  //   const newToDoList = toDoList.map(task => {
  //     const {key, pin} = task;

  //     if (key === id) {
  //       if (pin) {
  //         // Unpin
  //         task.pin = false;
  //       } else {
  //         // pin
  //         task.pin = true;
  //       }

  //       task.pinnedIndex = pinnedIndex;
  //     }

  //     return task;
  //   });

  //   setToDoList(newToDoList);
  // };

  return {toDoList, addToDo, deleteToDo, updateToDoStatus, updateToDoPin};
};
