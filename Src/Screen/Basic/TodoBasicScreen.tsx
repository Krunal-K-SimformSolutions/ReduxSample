import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Store } from '../../Redux/Basic';
import styles from './TodoBasicStyle';
import { TodoList } from './TodoList';

export default function TodoBasicScreen(): React.ReactElement {
  return (
    <View style={styles.screen}>
      <Provider store={Store.store}>
        <PersistGate loading={null} persistor={Store.persistor}>
          <TodoList />
        </PersistGate>
      </Provider>
    </View>
  );
}
