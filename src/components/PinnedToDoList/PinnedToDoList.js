import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {List} from 'react-native-paper';
import ToDoList from '../ToDoList/ToDoList';

export const PinnedToDoList = props => {
  const [expanded, setExpanded] = useState(true);
  const {pinnedList, deleteToDo, updateToDoStatus, updateToDoPin} = props;

  return (
    <List.Accordion
      title="Pinned Tasks"
      style={styles.listBackground}
      titleStyle={styles.listTitle}
      expanded={expanded}
      onPress={() => setExpanded(!expanded)}>
      <ToDoList
        toDoList={pinnedList}
        deleteToDo={deleteToDo}
        updateToDoStatus={updateToDoStatus}
        updateToDoPin={updateToDoPin}
        main={false}
      />
    </List.Accordion>
  );
};

const styles = StyleSheet.create({
  listBackground: {
    backgroundColor: '#FFCC00',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,.1)',
  },
  listTitle: {
    color: '#000',
  },
});

export default PinnedToDoList;
