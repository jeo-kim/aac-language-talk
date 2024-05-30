import React from 'react';
import { Dimensions, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryItem from './CategoryItem';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

function CategoryList() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <CategoryItem title={item.title} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

export default CategoryList;

const fullHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: fullHeight,
    flex: 1,
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'space-between',
  },
});
