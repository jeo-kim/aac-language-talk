import React, { ReactNode, useCallback, useMemo, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import styled from 'styled-components/native';

interface Props {
  placeholder: string;
  children: ReactNode;
}

function Select({ placeholder, children }: Props) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['50%', '90%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  return (
    <View>
      <SelectWrapper>
        <TouchableOpacity onPress={handlePresentModalPress}>
          <TextWrapper>{placeholder}</TextWrapper>
        </TouchableOpacity>
      </SelectWrapper>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        onChange={handleSheetChanges}>
        <BottomSheetView style={styles.contentContainer}>
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}

export default Select;

const SelectWrapper = styled.View`
  background-color: white;
  font-size: ${RFValue(16)}px;
  padding: 17px 15px;
  border-radius: 12px;
  flex: 1;
`;

const TextWrapper = styled.Text`
  color: #8e95a3;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
