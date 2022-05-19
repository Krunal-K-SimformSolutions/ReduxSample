import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Store } from '../../Redux/Toolkit';
import { TodoList } from './TodoList';
import styles from './TodoToolkitStyle';

export default function TodoToolkitScreen(): React.ReactElement {
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
