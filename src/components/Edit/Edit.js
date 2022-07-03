import React, {useState} from 'react';
import {Text, View, Alert, Pressable, TextInput, Button} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {EditStyles as styles} from './Edit.style';
import BaseMenu from '../BaseMenu/BaseMenu';

const Edit = props => {
  const {data, goBack, deleteToDo, updateToDoStatus, editToDo} = props;
  const {task, completed, key} = data;

  const [defaultDescription, setDefaultDescription] = useState(task);
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [taskDescription, setTaskDescription] = useState(defaultDescription);
  const [textInputBorderColor, setTextInputBorderColor] =
    useState('rgba(0, 0, 0, .1)');
  const [isCompleted, setIsCompleted] = useState(completed);

  const alertDeleteTask = () => {
    Alert.alert('Would you like to delete this task?', '', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: handleDelete,
      },
    ]);
  };

  const handleDelete = () => {
    deleteToDo([key]);
    goBack();
  };

  const handleMark = () => {
    updateToDoStatus([key]);
    setIsCompleted(!isCompleted);
    setMenuVisibility(false);
  };

  const handleSave = () => {
    if (!taskDescription.length) {
      handleDelete();
    } else {
      const clonedTask = JSON.parse(JSON.stringify(data));

      clonedTask.task = taskDescription;

      editToDo(clonedTask);
      setDefaultDescription(taskDescription);
    }
  };

  return (
    <View style={[styles.generalMargin, {marginTop: 15}]}>
      <View style={styles.viewHeader}>
        <Pressable onPress={goBack}>
          <FontAwesome5 style={styles.btn} name="angle-left" />
        </Pressable>

        <BaseMenu
          menuProps={{
            visible: menuVisibility,
            onDismiss: () => setMenuVisibility(false),
            anchor: (
              <Pressable
                onPress={() => {
                  setMenuVisibility(true);
                }}>
                <Text style={[styles.btn, {fontSize: 18}]}>Actions</Text>
              </Pressable>
            ),
          }}
          options={[
            {
              key: 'delete',
              onPress: alertDeleteTask,
              title: 'Delete task',
            },
            {
              key: 'mark',
              onPress: handleMark,
              title: isCompleted ? 'Mark as imcompleted' : 'Mark as completed',
            },
          ]}
          showDivider={false}
        />
      </View>

      <View>
        <TextInput
          style={
            isCompleted
              ? [
                  styles.input,
                  {
                    borderColor: textInputBorderColor,
                    textDecorationLine: 'line-through',
                  },
                ]
              : [styles.input, {borderColor: textInputBorderColor}]
          }
          value={taskDescription}
          autoCapitalize="none"
          onChangeText={setTaskDescription}
          onFocus={() => setTextInputBorderColor('rgba(0, 123, 255, 1)')}
          multiline={true}
          numberOfLines={4}
        />

        <View style={[styles.viewHeader, {marginTop: 20}]}>
          <Button
            title="Cancel"
            color="#f194ff"
            onPress={() => setTaskDescription(defaultDescription)}
            disabled={taskDescription === defaultDescription}
          />
          <Button
            title="Save"
            color="#007AFF"
            onPress={handleSave}
            disabled={taskDescription === defaultDescription}
          />
        </View>
      </View>
    </View>
  );
};

export default Edit;
