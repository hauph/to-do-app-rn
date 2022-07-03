/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {SafeAreaView, StyleSheet, View, Platform} from 'react-native';
import Main from './components/Main/Main';

const App: () => Node = () => {
  return (
    <>
      {Platform.OS === 'ios' ? (
        <SafeAreaView>
          <Main />
        </SafeAreaView>
      ) : (
        <View>
          <Main />
        </View>
      )}
    </>
  );
};

export default App;
