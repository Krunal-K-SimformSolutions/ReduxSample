import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints
} from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TodoData } from '../../TodoData';
import styles from './BottomAlertStyle';

type BottomAlertPropsType = {
  editItem: TodoData;
  bottomSheetRef: React.ReactObject<BottomSheetModal>;
  handleCancel: () => void;
  handleUpdate: (item: TodoData) => () => void;
};

export function BottomAlert({
  bottomSheetRef,
  editItem,
  handleCancel,
  handleUpdate
}: BottomAlertPropsType): React.ReactElement {
  const [item, setItem] = useState<TodoData>(editItem);
  const { bottom: safeBottomArea } = useSafeAreaInsets();
  const initialSnapPoints = useMemo(() => ['25%', 'CONTENT_HEIGHT'], []);
  const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const contentContainerStyle = useMemo(
    () => ({
      ...styles.contentContainerStyle,
      paddingBottom: safeBottomArea || 6
    }),
    [safeBottomArea]
  );

  const handleTextChange = useCallback(
    (label: string) => (text: string) => {
      setItem((prev) => ({ ...prev, [label]: text }));
    },
    []
  );

  useEffect(() => {
    setItem(editItem);
  }, [editItem]);

  return (
    <BottomSheetModal
      enablePanDownToClose
      ref={bottomSheetRef}
      index={1}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      backdropComponent={(props) => {
        return <BottomSheetBackdrop {...props} />;
      }}
    >
      <BottomSheetView style={contentContainerStyle} onLayout={handleContentLayout}>
        <Text style={styles.title}>Edit Todo</Text>
        <Text style={styles.label}>Title:</Text>
        <BottomSheetTextInput style={styles.input} value={item?.title} onChangeText={handleTextChange('title')} />
        <Text style={styles.label}>Description:</Text>
        <BottomSheetTextInput
          style={styles.input}
          value={item?.description}
          onChangeText={handleTextChange('description')}
        />
        <View style={styles.buttonContent}>
          <Button title="Cancel" onPress={handleCancel} />
          <Button title="Save" onPress={handleUpdate(item)} />
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
