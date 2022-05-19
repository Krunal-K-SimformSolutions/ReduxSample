import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Store } from '../../Redux/Sauce';
import { TodoList } from './TodoList';
import styles from './TodoSauceStyle';

export default function TodoSauceScreen(): React.ReactElement {
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
