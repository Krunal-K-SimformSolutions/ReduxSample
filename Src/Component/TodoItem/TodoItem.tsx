import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { images } from '../../Assets';
import { TodoData } from '../../TodoData';
import styles from './TodoStyle';

type TodoListItemPropsType = {
  item: TodoData;
  handleDelete: (id: number) => () => void;
  handleEdit: (item: TodoData) => () => void;
};

export default function TodoItem({ item, handleDelete, handleEdit }: TodoListItemPropsType): React.ReactElement {
  return (
    <Pressable onPress={handleEdit(item)}>
      {({ pressed }) => {
        const containerStyle = {
          backgroundColor: pressed ? 'red' : 'black'
        };
        const imageStyle = (pressed) => ({
          opacity: pressed ? 0.5 : 1
        });
        return (
          <View style={[styles.itemView, containerStyle]}>
            <View style={styles.container}>
              <Text style={styles.textTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.textDesc} numberOfLines={1}>
                {item.description}
              </Text>
            </View>
            <Pressable onPress={handleDelete(item.id)}>
              {({ pressed }) => (
                <Image style={[styles.image, imageStyle(pressed)]} source={images.icDelete} resizeMode="contain" />
              )}
            </Pressable>
          </View>
        );
      }}
    </Pressable>
  );
}
