import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Button, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import type { RootStateType, AppDispatchType } from '../../Redux/Sauce';
import { BottomAlert, TodoItem } from '../../Component';
import { Creators } from '../../Redux/Sauce';
import { TodoData } from '../../TodoData';
import styles from './TodoSauceStyle';

export function TodoList(): React.ReactElement {
  const dispatch = useDispatch<AppDispatchType>();
  const navigation = useNavigation();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const list = useSelector<RootStateType, TodoData[]>((state) => state.todoSauce.todoList);
  const [editItem, setEditItem] = useState<TodoData | undefined | null>();

  const handleDelete = useCallback(
    (id) => () => {
      dispatch(Creators.deleteTodoItem({ id }));
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
      dispatch(Creators.updateTodoItem({ data: item }));
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
      headerRight: () => <Button title="add" onPress={() => dispatch(Creators.addTodoItem())} />
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
