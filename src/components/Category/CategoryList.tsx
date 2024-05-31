import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryItem from './CategoryItem';
import { RFValue } from 'react-native-responsive-fontsize';
import { CategoryItemProps } from '../../types/Category';

type Props = {
  data: CategoryItemProps[];
};

function CategoryList({ data }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>카테고리</Text>
      <ScrollView contentContainerStyle={styles.list}>
        {data.map(item => (
          <CategoryItem
            icon={item.icon}
            name={item.name}
            id={item.id}
            key={item.id}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default CategoryList;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
  title: {
    fontSize: RFValue(16),
    fontWeight: '700',
    marginBottom: 16,
  },
  list: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    paddingBottom: 40,
  },
});
