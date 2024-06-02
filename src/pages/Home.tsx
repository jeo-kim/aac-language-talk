import React from 'react';
import { StyleSheet, View } from 'react-native';
import CategoryList from '../components/Category/CategoryList';

type Props = {};

const DATA = [
  {
    id: 1,
    icon: '',
    name: '모든 카드',
  },
  {
    id: 2,
    icon: '',
    name: '자주 쓰는 카드',
  },
  {
    id: 3,
    icon: '',
    name: '기본 카테고리 1',
  },
  {
    id: 4,
    icon: '',
    name: '기본 카테고리 2',
  },
  {
    id: 5,
    icon: '',
    name: '기본 카테고리 1',
  },
  {
    id: 6,
    icon: '',
    name: '기본 카테고리 2',
  },
];

function Home({}: Props) {
  return (
    <View style={styles.view}>
      <CategoryList data={DATA} />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 16,
  },
});
