import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Button, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import type { RootStateType, AppDispatchType } from '../../Redux/Basic';
import { BottomAlert, TodoItem } from '../../Component';
import { addTodoItem, updateTodoItem, deleteTodoItem } from '../../Redux/Basic';
import { TodoData } from '../../TodoData';
import styles from './TodoBasicStyle';

export function TodoList(): React.ReactElement {
  const dispatch = useDispatch<AppDispatchType>();
  const navigation = useNavigation();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const list = useSelector<RootStateType, TodoData[]>((state) => state.todoNormal.todoList);
  const [editItem, setEditItem] = useState<TodoData | undefined | null>();

  const handleDelete = useCallback(
    (id) => () => {
      dispatch(deleteTodoItem({ id }));
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
      dispatch(updateTodoItem({ data: item }));
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
      headerRight: () => <Button title="add" onPress={() => dispatch(addTodoItem())} />
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
