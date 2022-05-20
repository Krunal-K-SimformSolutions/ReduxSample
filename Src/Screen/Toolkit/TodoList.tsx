import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import type { RootStateType, AppDispatchType } from '../../Redux/Toolkit';
import { BottomAlert, TodoItem } from '../../Component';
import { ToolkitActions, ToolkitSelectors } from '../../Redux/Toolkit';
import { TodoData } from '../../TodoData';
import styles from './TodoToolkitStyle';

export function TodoList(): React.ReactElement {
  const dispatch = useDispatch<AppDispatchType>();
  const navigation = useNavigation();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const list = useSelector<RootStateType, TodoData[]>(ToolkitSelectors.getTodoList);
  const [editItem, setEditItem] = useState<TodoData | undefined | null>();

  const handleDelete = useCallback(
    (id) => () => {
      dispatch(ToolkitActions.deleteTodoItem({ id }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleEdit = useCallback(
    (item) => () => {
      setEditItem(item);
      bottomSheetRef.current?.present();
    },
    []
  );

  const handleUpdate = useCallback(
    (item: TodoData) => () => {
      dispatch(ToolkitActions.updateTodoItem({ data: item }));
      bottomSheetRef.current?.close();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleCancel = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={styles.btnContainer}>
            <Pressable style={styles.btnView} onPress={() => dispatch(ToolkitActions.addTodoItem())}>
              <Text style={styles.btnText}>Add</Text>
            </Pressable>
            <Pressable style={styles.btnView} onPress={() => dispatch(ToolkitActions.fetchTodoList(10))}>
              <Text style={styles.btnText}>Fetch</Text>
            </Pressable>
            <Pressable style={styles.btnView} onPress={() => dispatch(ToolkitActions.cleanAction())}>
              <Text style={styles.btnText}>Clear</Text>
            </Pressable>
          </View>
        );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  return (
    <>
      <FlatList
        data={list}
        style={styles.flatlist}
        renderItem={({ item }) => <TodoItem item={item} handleDelete={handleDelete} handleEdit={handleEdit} />}
        keyExtractor={(item: TodoData) => item.id}
      />
      <BottomAlert
        bottomSheetRef={bottomSheetRef}
        editItem={editItem}
        handleCancel={handleCancel}
        handleUpdate={handleUpdate}
      />
    </>
  );
}
