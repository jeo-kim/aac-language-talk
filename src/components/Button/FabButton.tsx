import React from 'react';
import { FAB, Portal } from 'react-native-paper';
import { CardIcon, CategoryIcon, CloseIcon, PlusIcon } from '../../assets/svgs';
import { StyleSheet } from 'react-native';

interface FabBtnProps {
  setPress: (page: string, id: number) => void;
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}

function FabButton({ setPress, isOpen, setIsOpen }: FabBtnProps) {
  return (
    <Portal>
      <FAB.Group
        open={isOpen}
        icon={() =>
          isOpen ? (
            <CloseIcon width={24} height={24} />
          ) : (
            <PlusIcon width={24} height={24} />
          )
        }
        fabStyle={styles.fabItem}
        style={styles.fab}
        visible={true}
        actions={[
          {
            icon: () => <CategoryIcon />,
            label: '카테고리 추가',
            onPress: () => setPress('AddItems', 1),
            style: { backgroundColor: 'white', borderRadius: 36 },
          },
          {
            icon: () => <CardIcon />,
            label: '카드 추가',
            onPress: () => setPress('AddItems', 2),
            style: { backgroundColor: 'white', borderRadius: 36 },
          },
        ]}
        onStateChange={({ open }) => setIsOpen(open)}
        onPress={() => {
          if (isOpen) {
            // Do something if the speed dial is open
          }
        }}
      />
    </Portal>
  );
}

export default FabButton;

const styles = StyleSheet.create({
  fabItem: {
    backgroundColor: '#34C185',
    borderRadius: 36,
  },

  fab: {
    marginBottom: 48,
  },
});
