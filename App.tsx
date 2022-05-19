import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React from 'react';
import { AppNavigator } from './Src/Navigator';

export default function App(): React.ReactElement {
  return (
    <BottomSheetModalProvider>
      <AppNavigator />
    </BottomSheetModalProvider>
  );
}
