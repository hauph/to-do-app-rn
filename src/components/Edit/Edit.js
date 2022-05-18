import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, Alert, Pressable} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Utils} from '../../utils';
import {EditStyles as styles} from './Edit.style';
import BaseMenu from '../BaseMenu/BaseMenu';

const Edit = props => {
  const [menuVisibility, setMenuVisibility] = useState(false);

  const {task, goBack} = props;

  return (
    <View style={styles.generalMargin}>
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
              onPress: () => console.log('delete'),
              title: 'Delete task',
            },
            {
              key: 'mark',
              onPress: () => console.log('mark'),
              title: 'Mark as completed',
            },
          ]}
          showDivider={false}
        />
      </View>
    </View>
  );
};

export default Edit;
