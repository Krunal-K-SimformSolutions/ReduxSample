import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { AppRoute, navigateWithParam } from '../../Navigator';
import styles from './OptionStyle';

export default function OptionScreen(): React.ReactElement {
  return (
    <View style={styles.screen}>
      <Pressable style={styles.button} onPress={() => navigateWithParam(AppRoute.TODO_BASIC)}>
        <Text style={styles.text}>Todo With Redux(Basic)</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigateWithParam(AppRoute.TODO_SAUCE)}>
        <Text style={styles.text}>Todo With Redux Sauce</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigateWithParam(AppRoute.TODO_TOOLKIT)}>
        <Text style={styles.text}>Todo With Redux Toolkit</Text>
      </Pressable>
    </View>
  );
}
