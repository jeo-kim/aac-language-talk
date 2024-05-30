import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import CategoryList from '../components/Category/CategoryList';

type Props = {};

const fullHeight = Dimensions.get('window').height;

function Home({}: Props) {
  return (
    <View style={styles.view}>
      <Text>Home</Text>
      <CategoryList />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});
